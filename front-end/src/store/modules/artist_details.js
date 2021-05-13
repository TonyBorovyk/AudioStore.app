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
    const res = await fetch(`${process.env.VUE_APP_URL}/artists/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status == 404) {
          router.push("/404");
          dispatch("data_upload/changeDataUploadStatus", true, { root: true });
          return 0;
        }
        if (response.status == 500) {
          router.push("/error");
          dispatch("data_upload/changeDataUploadStatus", true, { root: true });
          return 0;
        }
      })
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
