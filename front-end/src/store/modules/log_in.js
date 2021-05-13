import router from "@/router";

const state = {
  logged_in: false,
  user: { username: "" }
};

const getters = {
  isLoggedIn: state => state.logged_in,
  getUser: state => state.user
};

const actions = {
  async SignUp({ dispatch }, data) {
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
    let response = await fetch(`${process.env.VUE_APP_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status == 201) {
      response = await response.json();
      router.push("/login");
      return {};
    } else {
      response = await response.json();
      if (response.message == "email exist") {
        return { email_exist: true };
      }
      if (response.message == "username exist") {
        return { username_exist: true };
      }
    }
  },
  async LogIn({ dispatch }, data) {
    dispatch("data_upload/changeDataUploadStatus", true, { root: true });
    let response = await fetch(`${process.env.VUE_APP_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    });
    if (response.status == 200) {
      response = await response.json();
      dispatch("fetchUser");
      router.push("/");
      return;
    } else {
      response = await response.json();
      const error = response.message;
      return error;
    }
  },
  async fetchUser({ commit, dispatch }) {
    const res = await fetch(`${process.env.VUE_APP_URL}/profile`, {
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
        if (response.status == 401) {
          return { user: { username: "" } };
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
    console.log(res);
    await commit("setUser", res.user);
    dispatch("changeLogInStatus", res.success);
  },
  changeLogInStatus({ commit }, status) {
    commit("setLoggedIn", status);
  }
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setLoggedIn: (state, logged_in) => (state.logged_in = logged_in)
};

export default {
  state,
  getters,
  actions,
  mutations
};
