import router from "@/router";

const state = {
  album_details: {}
};

const getters = {
  getAlbumDetails: state => state.album_details
};

const actions = {
  async fetchAlbumDetails({ commit, dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/albums/${id}`)
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
    await commit("setAlbumDetails", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
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
