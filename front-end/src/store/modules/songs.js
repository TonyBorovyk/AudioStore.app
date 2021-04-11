const state = {
  songs: ""
};

const getters = {
  getSongs: state => state.songs
};

const actions = {
  async fetchRecAddedSongs({ commit }) {
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/last_added_songs`
    ).then(response => response.json());
    console.log(res);

    await commit("setSongs", res);
  }
};

const mutations = {
  setSongs: (state, songs) => (state.songs = songs)
};

export default {
  state,
  getters,
  actions,
  mutations
};
