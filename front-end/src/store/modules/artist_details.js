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
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/artists?artist_id=${id}`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });
    console.log(res);

    await commit("setArtistDetails", res[0]);

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
