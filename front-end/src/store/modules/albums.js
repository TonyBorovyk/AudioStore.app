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
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/albums`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });
    console.log(res);

    await commit("setAlbums", res);
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
