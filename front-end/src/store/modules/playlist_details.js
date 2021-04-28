import router from "@/router";

const state = {
  playlist: {
      tracks:[{artists:[]}],
  },
};

const getters = {
  getPlaylist: state => state.playlist,
};

const actions = {
  async fetchPlaylist({ commit, dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`http://localhost:3000/profile/playlists/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });
    await commit("setPlaylist", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
};

const mutations = {
  setPlaylist: (state, playlist) => (state.playlist = playlist),
};

export default {
  state,
  getters,
  actions,
  mutations
};
