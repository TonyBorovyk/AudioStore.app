import router from "@/router";

const state = {
  playlists: [],
  playlist_popup_active: false
};

const getters = {
  getPlaylists: state => state.playlists,
  isPlaylistPopUpActive: state => state.playlist_popup_active
};

const actions = {
  async fetchAllUserPlaylists({ commit, dispatch } /*user_id*/) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`http://localhost:3000/profile/playlists`, {
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

    await commit("setPlaylists", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  changePlaylistPopUpActivity({ commit, dispatch, state }) {
    commit("setActivityOfPlaylistPopUp", !state.playlist_popup_active);
    if (state.playlist_popup_active) {
      dispatch("fetchAllUserPlaylists");
    }
  }
};

const mutations = {
  setPlaylists: (state, playlists) => (state.playlists = playlists),
  setActivityOfPlaylistPopUp: (state, playlist_popup_active) =>
    (state.playlist_popup_active = playlist_popup_active)
};

export default {
  state,
  getters,
  actions,
  mutations
};
