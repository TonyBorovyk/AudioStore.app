import router from "@/router";

const state = {
  artist_details: {}
};

const getters = {
  getArtistDetails: state => state.artist_details
};

const actions = {
  async fetchArtistDetails({ commit, dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`http://localhost:3000/artists/${id}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });

    await commit("setArtistDetails", res.data);

    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
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
