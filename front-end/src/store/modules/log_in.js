const state = {
  logged_in: false,
  user: {}
};

const getters = {
  isLoggedIn: state => state.logged_in
};

const actions = {
  changeLogInStatus({ commit, state }) {
    commit("setLoggedIn", !state.logged_in);
  }
};

const mutations = {
  setLoggedIn: (state, logged_in) => (state.logged_in = logged_in)
};

export default {
  state,
  getters,
  actions,
  mutations
};
