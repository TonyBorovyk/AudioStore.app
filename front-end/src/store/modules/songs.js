import { sleep } from "@/functions/sleep.js";
import router from "@/router";

const state = {
  songs: [{ artists: [] }]
};

const getters = {
  getSongs: state => state.songs
};

const actions = {
  async searchSongs({ commit, dispatch }, search) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", 1, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/search/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ search })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status == 404) {
          return { data: [{ artists: [] }] };
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
    await commit("setSongs", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async fetchSongsByAlbumId({ commit, dispatch }, album_id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/songs/album?album_id=${album_id}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status == 404) {
          return { data: [{ artists: [] }] };
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
    await commit("setSongs", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async fetchSongsByArtistId({ commit, dispatch }, artist_id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/songs/artist?artist_id=${artist_id}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status == 404) {
          return { data: [{ artists: [] }] };
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
    await commit("setSongs", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async fetchSongs({ commit, dispatch, rootGetters }, { order_by, asc }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", 1, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/songs?order_by=${order_by}&sort_desk=${asc}&limit=3&page=${rootGetters["page/getCurPage"]}`
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
    await commit("setSongs", res.data.tracks);
    await sleep(1000);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async moreSongs({ commit, dispatch, rootGetters }, { order_by, asc }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    dispatch("page/changeCurPage", rootGetters["page/getCurPage"] + 1, {
      root: true
    });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/songs?order_by=${order_by}&sort_desk=${asc}&limit=3&page=${rootGetters["page/getCurPage"]}`
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
    await commit("addSongs", res.data.tracks);
    await sleep(1000);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
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
