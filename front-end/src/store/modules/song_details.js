import { sleep } from "@/functions/sleep.js";
import router from "@/router";

const state = {
  song_details: {},
  song_album: {}
};

const getters = {
  getSongDetails: state => state.song_details,
  getSongAlbum: state => state.song_album
};

const actions = {
  async fetchSongDetails({ commit, dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`http://localhost:3000/songs/${id}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });
    console.log(res);

    await commit("setSongDetails", res.data);
    await sleep(1000);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  }
};

const mutations = {
  setSongDetails: (state, song_details) => {
    state.song_details = song_details;
    state.song_album = song_details.album;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
