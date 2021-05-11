import { sleep } from "@/functions/sleep.js";
import router from "@/router";

const state = {
  songs: [{ artists: [] }],
  cur_page: 1,
  total_pages: true,
};

const getters = {
  getSongs: state => state.songs,
  getCurPage: state => state.cur_page,
  getTotalPages: state => state.total_pages
};

//catch not working
const actions = {
  async fetchSongs({ commit, dispatch }, order_by) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/songs?order_by=${order_by}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });
    console.log(res.data)
    await commit("setSongs", res.data);
    await sleep(1000);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async moreSongs({ commit, dispatch, state }) {
    await commit("setCurPage", state.cur_page+1);
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/songs/more?limit=3&page=${state.cur_page}`
    ).then(response => response.json());
    console.log(res)
    if(res.data.total_pages<=state.cur_page){
      await commit("setTotalPages", false);
    }
    await commit("addSongs", res.data.tracks);
    await sleep(1000);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  }
};

const mutations = {
  setSongs: (state, songs) => (state.songs = songs),
  addSongs: (state, songs) => (state.songs = state.songs.concat(songs)),
  setCurPage: (state, cur_page) => (state.cur_page = cur_page),
  setTotalPages: (state, total_pages) => (state.total_pages = total_pages),
};

export default {
  state,
  getters,
  actions,
  mutations
};
