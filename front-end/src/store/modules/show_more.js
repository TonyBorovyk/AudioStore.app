const state = {
  show_more_active: false
};

const getters = {
  isShowMorePopUpActive: state => state.show_more_active
};

const actions = {
  changeShowMorePopUpActivity({ commit, state }) {
    commit("setActivityShowMorePopUp", !state.show_more_active);
  }
};

const mutations = {
  setActivityShowMorePopUp: (state, show_more_active) =>
    (state.show_more_active = show_more_active)
};

export default {
  state,
  getters,
  actions,
  mutations
};
