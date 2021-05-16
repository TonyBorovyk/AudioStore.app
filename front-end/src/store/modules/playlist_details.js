import router from "@/router";

const state = {
  playlist: {
    tracks: [{ artists: [] }]
  }
};

const getters = {
  getPlaylist: state => state.playlist
};

const actions = {
  async fetchPlaylist({ commit, dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/profile/playlists/${id}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status == 404) {
          router.push("/404");
          dispatch("data_upload/changeDataUploadStatus", true, { root: true });
          return 0;
        }
        if (response.status == 500) {
          router.push("/error");
          dispatch("data_upload/changeDataUploadStatus", true, { root: true });
          return 0;
        }
      })
      .catch(error => {
        console.error(error);
        router.push("/error");
      });
    await commit("setPlaylist", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  }
};

const mutations = {
  setPlaylist: (state, playlist) => (state.playlist = playlist)
};

export default {
  state,
  getters,
  actions,
  mutations
};
