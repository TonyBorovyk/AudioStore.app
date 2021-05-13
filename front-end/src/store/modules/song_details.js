import { sleep } from "@/functions/sleep.js";
import router from "@/router";

const state = {
  song_details: { artists: [] }
};

const getters = {
  getSongDetails: state => state.song_details
};

const actions = {
  async fetchSongDetails({ commit, dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/songs/${id}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });
    await commit("setSongDetails", res.data);
    await sleep(1000);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  }
};

const mutations = {
  setSongDetails: (state, song_details) => {
    state.song_details = song_details;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
