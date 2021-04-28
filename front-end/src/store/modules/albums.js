import router from "@/router";

const state = {
  albums: []
};

const getters = {
  getAlbums: state => state.albums
};

const actions = {
  async fetchAllAlbums({ commit, dispatch }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`http://localhost:3000/albums`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });

    await commit("setAlbums", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
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
