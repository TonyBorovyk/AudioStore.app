const state = {
  album_details: {}
};

const getters = {
  getAlbumDetails: state => state.album_details
};

const actions = {
  async fetchAlbumDetails({ commit }, id) {
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/albums?album_id=${id}`
    ).then(response => response.json());
    console.log(res);

    await commit("setAlbumDetails", res[0]);
  }
};

const mutations = {
  setAlbumDetails: (state, album_details) =>
    (state.album_details = album_details)
};

export default {
  state,
  getters,
  actions,
  mutations
};
