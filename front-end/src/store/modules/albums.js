import router from "@/router";

const state = {
  albums: []
};

const getters = {
  getAlbums: state => state.albums
};

const actions = {
  async fetchAlbums({ commit, dispatch, rootGetters }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", 1, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/albums/more?limit=3&page=${rootGetters["page/getCurPage"]}`
    )
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
        dispatch("data_upload/changeDataUploadStatus", true, { root: true });
      });
    console.log(res);
    dispatch("page/changeTotalPages", true, { root: true });
    if (res.data.totalPages <= rootGetters["page/getCurPage"]) {
      dispatch("page/changeTotalPages", false, { root: true });
    }
    await commit("setAlbums", res.data.albums);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async moreAlbums({ commit, dispatch, rootGetters }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", rootGetters["page/getCurPage"] + 1, {
      root: true
    });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/albums/more?limit=3&page=${rootGetters["page/getCurPage"]}`
    )
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
        dispatch("data_upload/changeDataUploadStatus", true, { root: true });
      });
    console.log(res);
    dispatch("page/changeTotalPages", true, { root: true });
    if (res.data.totalPages <= rootGetters["page/getCurPage"]) {
      dispatch("page/changeTotalPages", false, { root: true });
    }
    await commit("addAlbums", res.data.albums);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  }
};

const mutations = {
  setAlbums: (state, albums) => (state.albums = albums),
  addAlbums: (state, albums) => (state.albums = state.albums.concat(albums))
};

export default {
  state,
  getters,
  actions,
  mutations
};
