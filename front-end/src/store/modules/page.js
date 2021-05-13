const state = {
  cur_page: 1,
  total_pages: true
};

const getters = {
  getCurPage: state => state.cur_page,
  getTotalPages: state => state.total_pages
};

const actions = {
  changeCurPage({ commit }, cur_page) {
    commit("setCurPage", cur_page);
  },
  changeTotalPages({ commit }, total_pages) {
    commit("setTotalPages", total_pages);
  }
};

const mutations = {
  setCurPage: (state, cur_page) => (state.cur_page = cur_page),
  setTotalPages: (state, total_pages) => (state.total_pages = total_pages)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
