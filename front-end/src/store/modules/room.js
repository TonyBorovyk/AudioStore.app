const state = {
  song_id: "",
  songs_list: [],
  room_data: {}
};

const getters = {
  getSongId: state => state.song_id,
  getSongList: state => state.songs_list,
  getRoomData: state => state.room_data
};

const actions = {
  changeSongId({ commit }, song_id) {
    commit("setSongId", song_id);
  },
  changeSongList({ commit }, songs_list) {
    commit("setSongList", songs_list);
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
  setRoomData: (state, room_data) => (state.room_data = room_data)
};

export default {
  state,
  getters,
  actions,
  mutations
};
