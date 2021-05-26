import router from "@/router";

const state = {
  song_id: "",
  play: null,
  song_time: 0,
  current_time: 0,
  songs_list: [],
  room_data: {}
};

const getters = {
  getSongId: state => state.song_id,
  getSongList: state => state.songs_list,
  getRoomData: state => state.room_data,
  getPlay: state => state.play,
  getSongTime: state => state.song_time,
  getCurrentTime: state => state.current_time
};

const actions = {
  changeSongId({ commit }, song_id) {
    commit("setSongId", song_id);
  },
  changeSongList({ commit }, songs_list) {
    commit("setSongList", songs_list);
  },
  changePlay({ commit }, play) {
    commit("setPlay", play);
  },
  changeSongTime({ commit }, song_time) {
    commit("setSongTime", song_time);
  },

  changeCurrentTime({ commit }, current_time) {
    commit("setCurrentTime", current_time);
  },
  async fetchRoomData({ commit, dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/profile/rooms/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status == 404) {
          router.push("/404");
          dispatch("data_upload/changeDataUploadStatus", true, { root: true });
          return 0;
        }
        if (response.status == 409) {
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

    await commit("setRoomData", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async deleteRoom({ dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/profile/rooms/${id}`, {
      method: "DELETE",
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
        dispatch("data_upload/changeDataUploadStatus", true, { root: true });
        router.push("/error");
      });
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
    return res.success;
  }
};

const mutations = {
  setSongId: (state, song_id) => (state.song_id = song_id),
  setSongList: (state, songs_list) => (state.songs_list = songs_list),
  setRoomData: (state, room_data) => (state.room_data = room_data),
  setPlay: (state, play) => (state.play = play),
  setSongTime: (state, song_time) => (state.song_time = song_time),
  setCurrentTime: (state, current_time) => (state.current_time = current_time)
};

export default {
  state,
  getters,
  actions,
  mutations
};
