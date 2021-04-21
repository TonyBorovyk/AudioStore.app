import router from "@/router";

const state = {
  artists: []
};

const getters = {
  getArtists: state => state.artists
};

const actions = {
  async fetchAllArtists({ commit, dispatch }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`http://localhost:3000/artists`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });

    await commit("setArtists", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
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
