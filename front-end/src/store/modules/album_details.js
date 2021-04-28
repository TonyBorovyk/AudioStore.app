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
    const res = await fetch(`http://localhost:3000/albums/${id}`)
      .then(response => response.json())
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
