import router from "@/router";

const state = {
  playlists: [{}],
  playlist_popup_active: false,
  playlist_add_active: false,
  playlist_id: undefined
};

const getters = {
  getPlaylists: state => state.playlists,
  isPlaylistPopUpActive: state => state.playlist_popup_active,
  isAddPlaylistActive: state => state.playlist_add_active,
  getPlaylistId: state => state.playlist_id
};

const actions = {
  async fetchAllUserPlaylists({ commit, dispatch }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/profile/playlists`, {
      headers: {
        "Content-Type": "application/json"
      },
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
        if (response.status == 409) {
          return { data: [{}] };
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
    await commit("setPlaylists", res.data);
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
  },
  async createPlaylist({ dispatch }, { playlist_title }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(`${process.env.VUE_APP_URL}/profile/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ playlist_title, track_list: [] })
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
    return res;
  },
  async deletePlaylist({ dispatch }, id) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    const res = await fetch(
      `${process.env.VUE_APP_URL}/profile/playlists/${id}`,
      {
        method: "DELETE",
        credentials: "include"
      }
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
        router.push("/error");
      });
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
    return res;
  },
  async addSongPlaylist({ dispatch }, { playlists, track_id }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    playlists.forEach(async playlist => {
      await fetch(`${process.env.VUE_APP_URL}/profile/playlists/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ playlist_id: playlist, track_id })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          if (response.status == 404) {
            router.push("/404");
            dispatch("data_upload/changeDataUploadStatus", true, {
              root: true
            });
            return 0;
          }
          if (response.status == 500) {
            router.push("/error");
            dispatch("data_upload/changeDataUploadStatus", true, {
              root: true
            });
            return 0;
          }
        })
        .catch(error => {
          console.error(error);
          router.push("/error");
        });
    });

    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
    return true;
  },
  async removeSongPlaylist({ dispatch }, { playlist_id, track_id }) {
    dispatch("data_upload/changeDataUploadStatus", false, { root: true });
    await fetch(`${process.env.VUE_APP_URL}/profile/playlists/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ playlist_id, track_id })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status == 404) {
          router.push("/404");
          dispatch("data_upload/changeDataUploadStatus", true, {
            root: true
          });
          return 0;
        }
        if (response.status == 500) {
          router.push("/error");
          dispatch("data_upload/changeDataUploadStatus", true, {
            root: true
          });
          return 0;
        }
      })
      .catch(error => {
        console.error(error);
        router.push("/error");
      });

    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
    return true;
  },
  changePlaylistPopUpActivity({ commit, dispatch, state }) {
    commit("setActivityOfPlaylistPopUp", !state.playlist_popup_active);
    if (state.playlist_popup_active) {
      dispatch("fetchAllUserPlaylists");
    }
  },
  changeAddPlaylistActivity({ commit, state }) {
    commit("setActivityOfAddPlaylist", !state.playlist_add_active);
  },
  changePlaylistId({ commit }, id) {
    commit("setPlaylistId", id);
  }
};

const mutations = {
  setPlaylists: (state, playlists) => (state.playlists = playlists),
  setActivityOfPlaylistPopUp: (state, playlist_popup_active) =>
    (state.playlist_popup_active = playlist_popup_active),
  setActivityOfAddPlaylist: (state, playlist_add_active) =>
    (state.playlist_add_active = playlist_add_active),
  setPlaylistId: (state, playlist_id) => (state.playlist_id = playlist_id)
};

export default {
  state,
  getters,
  actions,
  mutations
};
