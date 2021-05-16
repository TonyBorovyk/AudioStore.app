import router from "@/router";

const state = {
  search_request: ""
};

const getters = {
  getSearchRequest: state => state.search_request
};

const actions = {
  async searchAll({ dispatch, state }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ search: state.search_request })
    })
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
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
    return res.data;
  },
  changeSearchRequest({ commit }, search_request) {
    commit("setSearchRequest", search_request);
  }
};

const mutations = {
  setSearchRequest: (state, search_request) =>
    (state.search_request = search_request)
};

export default {
  state,
  getters,
  actions,
  mutations
};
