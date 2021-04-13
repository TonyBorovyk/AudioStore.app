const state = {
  artist_details: {}
};

const getters = {
  getArtistDetails: state => state.artist_details
};

const actions = {
  async fetchArtistDetails({ commit }, id) {
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/artists?artist_id=${id}`
    ).then(response => response.json());
    console.log(res);

    await commit("setArtistDetails", res[0]);
  }
};

const mutations = {
  setArtistDetails: (state, artist_details) =>
    (state.artist_details = artist_details)
};

export default {
  state,
  getters,
  actions,
  mutations
};
