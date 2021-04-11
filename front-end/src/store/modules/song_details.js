const state = {
  song_details: {},
  song_album: {}
};

const getters = {
  getSongDetails: state => state.song_details,
  getSongAlbum: state => state.song_album
};

const actions = {
  async fetchSongDetails({ commit } /*, id*/) {
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/song_details`
    ).then(response => response.json());
    console.log(res);

    await commit("setSongDetails", res);
  }
};

const mutations = {
  setSongDetails: (state, song_details) => {
    state.song_details = song_details;
    state.song_album = song_details.album;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
