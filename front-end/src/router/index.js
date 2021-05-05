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
      import(/* webpackChunkName: "about" */ "../views/Albums.vue")
  },
  {
    path: "/albums/:album_id",
    name: "AlbumDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AlbumDetails.vue")
  },
  {
    path: "/artists",
    name: "Artists",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Artists.vue")
  },
  {
    path: "/artists/:artist_id",
    name: "ArtistDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ArtistDetails.vue")
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
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Search.vue")
  },
  {
    path: "/rooms",
    name: "Room",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Rooms.vue")
  },
  {
    path: "/rooms/:id",
    name: "RoomPage",
    component: () => import(/* webpackChunkName: "about" */ "../views/Room.vue")
  },
  {
    path: "/profile/:username",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue")
  },
  {
    path: "/profile/:username/playlists/:playlist_id",
    name: "Playlist",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Playlist.vue")
  },
  {
    path: "/error",
    name: "Error505",
    component: () => import(/* webpackChunkName: "about" */ "../views/505.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
