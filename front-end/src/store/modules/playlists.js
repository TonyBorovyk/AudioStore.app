const state = {
  playlists: [],
  playlist_popup_active: false
};

const getters = {
  getPlaylists: state => state.playlists,
  isPlaylistPopUpActive: state => state.playlist_popup_active
};

const actions = {
  async fetchAllUserPlaylists({ commit } /*user_id*/) {
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/playlists`
    ).then(response => response.json());
    console.log(res);

    await commit("setPlaylists", res);
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
