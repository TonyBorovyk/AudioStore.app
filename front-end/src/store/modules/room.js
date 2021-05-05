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
  fetchRoomData({ commit }) {
    //   const res = await fetch(`http://localhost:3000/songs/${id}`)
    //   .then(response => response.json())
    //   .catch(error => {
    //     console.error(error);
    //     router.push("/error");
    //   });
    // console.log(res);

    // await commit("setSongDetails", res.data);

    commit("setRoomData", {
      room_id: 1,
      room_name: "Hello world!",
      admin_id: "alexkharenko"
    });
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
