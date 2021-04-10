const state = {
  recentlyAddedSongs:"",
};

const getters = {
  getRecentlyAddedSongs: (state) => state.recentlyAddedSongs,
};

const actions = {
  async fetchRecAddedSongs({ commit }) {
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/last_added_songs`
    ).then((response) => response.json());
    console.log(res);

    await commit("setRecentlyAddedSongs", res);
  }
};

const mutations = {
  setRecentlyAddedSongs: (state, rec_add_songs) => (state.recentlyAddedSongs = rec_add_songs),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
