import {sleep} from "@/functions/sleep.js";
// import router from '@/router';

const state = {
  songs: ""
};

const getters = {
  getSongs: state => state.songs
};

//catch not working
const actions = {
  async fetchRecAddedSongs({ commit, dispatch }) {
    dispatch('data_upload/changeDataUploadStatus', false, {root:true});
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/last_added_songs`
    ).then(response => response.json()).catch( error => {
      console.error(error);
      //router.push('/error')
    });
    console.log(res);

    await commit("setSongs", res);
    await sleep(1000);
    dispatch('data_upload/changeDataUploadStatus', true, {root:true});
  },
  async moreRecAddedSongs({ commit, dispatch }) {
    dispatch('data_upload/changeDataUploadStatus', false, {root:true});
    const res = await fetch(
      `https://my-json-server.typicode.com/AlexKharenko/Audio/last_added_songs`
    ).then(response => response.json());
    console.log(res);

    await commit("addSongs", res);
    await sleep(1000);
    dispatch('data_upload/changeDataUploadStatus', true, {root:true});
  }
};

const mutations = {
  setSongs: (state, songs) => (state.songs = songs),
  addSongs: (state, songs) => (state.songs = state.songs.concat(songs))
};

export default {
  state,
  getters,
  actions,
  mutations
};
