import router from "@/router";

const state = {
  logged_in: false,
  user: { username: "" }
};

const getters = {
  isLoggedIn: state => state.logged_in,
  getUser: state => state.user
};

const actions = {
  async fetchUser({ commit, dispatch }) {
    const res = await fetch(`${process.env.VUE_APP_URL}/profile`, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
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
    await commit("setUser", res.user || { username: "" });
    dispatch("changeLogInStatus", res.success);
  },
  changeLogInStatus({ commit }, status) {
    commit("setLoggedIn", status);
  }
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setLoggedIn: (state, logged_in) => (state.logged_in = logged_in)
};

export default {
  state,
  getters,
  actions,
  mutations
};
