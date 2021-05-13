import router from "@/router";

const state = {
  artists: []
};

const getters = {
  getArtists: state => state.artists
};

const actions = {
  async fetchArtists({ commit, dispatch, rootGetters }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", 1, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/artists/more?limit=3&page=${rootGetters["page/getCurPage"]}`
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
    dispatch("page/changeTotalPages", true, { root: true });
    if (res.data.total_pages <= rootGetters["page/getCurPage"]) {
      dispatch("page/changeTotalPages", false, { root: true });
    }
    await commit("setArtists", res.data.artists);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async moreArtists({ commit, dispatch, rootGetters }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", rootGetters["page/getCurPage"] + 1, {
      root: true
    });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/artists/more?limit=3&page=${rootGetters["page/getCurPage"]}`
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
    dispatch("page/changeTotalPages", true, { root: true });
    if (res.data.total_pages <= rootGetters["page/getCurPage"]) {
      dispatch("page/changeTotalPages", false, { root: true });
    }
    await commit("addArtists", res.data.artists);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  }
};

const mutations = {
  setArtists: (state, artists) => (state.artists = artists),
  addArtists: (state, artists) =>
    (state.artists = state.artists.concat(artists))
};

export default {
  state,
  getters,
  actions,
  mutations
};
