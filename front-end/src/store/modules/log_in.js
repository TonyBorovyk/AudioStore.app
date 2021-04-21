import router from "@/router";

const state = {
  logged_in: false,
  user: {}
};

const getters = {
  isLoggedIn: state => state.logged_in,
  getUser: state => state.user
};

const actions = {
  async fetchUser({ commit, dispatch }) {
    const res = await fetch(`http://localhost:3000/profile`, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        router.push("/error");
      });

    await commit("setUser", res.user);
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
