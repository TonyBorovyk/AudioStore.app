import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/songs",
    name: "Songs",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Songs.vue")
  },
  {
    path: "/songs/:track_id",
    name: "SongDetails",
    component: () => import(/* webpackChunkName: "about" */ "../views/Song.vue")
  },
  {
    path: "/albums",
    name: "Albums",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/albums/:album_id",
    name: "AlbumDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/artists",
    name: "Artists",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/artists/:artist_id",
    name: "ArtistDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "LogIn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LogIn.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/rooms",
    name: "Room",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/rooms/:id",
    name: "RoomPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/profile/:user_id",
    name: "Profile",
    children: [
      {
        path: "playlists",
        name: "UserPlaylists",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ],
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
