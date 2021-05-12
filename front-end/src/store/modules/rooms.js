import router from "@/router";

const state = {
  create_room_active: false,
  rooms: [{}]
};

const getters = {
  getRooms: state => state.rooms,
  isCreateRoomPopUpActive: state => state.create_room_active
};

const actions = {
  async fetchRooms({ commit, dispatch, rootGetters }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", 1, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/profile/rooms/more?limit=3&page=${rootGetters["page/getCurPage"]}`
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
        dispatch("data_upload/changeDataUploadStatus", true, { root: true });
        router.push("/error");
      });
    console.log(res.data);
    dispatch("page/changeTotalPages", true, { root: true });
    if (res.data.total_pages <= rootGetters["page/getCurPage"]) {
      dispatch("page/changeTotalPages", false, { root: true });
    }
    await commit("setRooms", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async moreRooms({ commit, dispatch, rootGetters }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", rootGetters["page/getCurPage"] + 1, {
      root: true
    });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/profile/rooms/more?limit=3&page=${rootGetters["page/getCurPage"]}`
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
        dispatch("data_upload/changeDataUploadStatus", true, { root: true });
        router.push("/error");
      });
    console.log(res.data);
    dispatch("page/changeTotalPages", true, { root: true });
    if (res.data.total_pages <= rootGetters["page/getCurPage"]) {
      dispatch("page/changeTotalPages", false, { root: true });
    }
    await commit("addRooms", res.data.rooms);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async createRoom({ dispatch }, { room_name }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/profile/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ room_name })
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
    if (res.data || res.data.room_id) {
      router.push(`/rooms/${res.data.room_id}`);
    }
  },
  changeCreateRoomPopUpActivity({ commit, state }) {
    commit("setActivityCreateRoomPopUp", !state.create_room_active);
  }
};

const mutations = {
  setRooms: (state, rooms) => (state.rooms = rooms),
  addRooms: (state, rooms) => (state.rooms = state.rooms.concat(rooms)),
  setActivityCreateRoomPopUp: (state, create_room_active) =>
    (state.create_room_active = create_room_active)
};

export default {
  state,
  getters,
  actions,
  mutations
};
