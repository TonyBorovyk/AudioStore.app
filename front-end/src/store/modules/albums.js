const state = {
  albums: []
};

const getters = {
  getAlbums: state => state.albums
};

const actions = {
  async fetchAllAlbums({ commit }) {
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/albums`
    ).then(response => response.json());
    console.log(res);

    await commit("setAlbums", res);
  }
};

const mutations = {
  setAlbums: (state, albums) => (state.albums = albums)
};

export default {
  state,
  getters,
  actions,
  mutations
};
