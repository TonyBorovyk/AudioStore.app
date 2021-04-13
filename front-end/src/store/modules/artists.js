const state = {
  artists: []
};

const getters = {
  getArtists: state => state.artists
};

const actions = {
  async fetchAllArtists({ commit }) {
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/artists`
    ).then(response => response.json());
    console.log(res);

    await commit("setArtists", res);
  }
};

const mutations = {
  setArtists: (state, artists) => (state.artists = artists)
};

export default {
  state,
  getters,
  actions,
  mutations
};
