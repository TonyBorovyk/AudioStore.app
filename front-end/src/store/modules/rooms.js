const state = {
  create_room_active: false
};

const getters = {
  isCreateRoomPopUpActive: state => state.create_room_active
};

const actions = {
  changeCreateRoomPopUpActivity({ commit, state }) {
    commit("setActivityCreateRoomPopUp", !state.create_room_active);
  }
};

const mutations = {
  setActivityCreateRoomPopUp: (state, create_room_active) =>
    (state.create_room_active = create_room_active)
};

export default {
  state,
  getters,
  actions,
  mutations
};
