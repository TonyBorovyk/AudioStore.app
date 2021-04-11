import { createStore } from "vuex";
import songs from "./modules/songs";
import song_details from "./modules/song_details";
import playlists from "./modules/playlists";
import log_in from "./modules/log_in";

export default createStore({
  modules: {
    songs,
    playlists,
    log_in,
    song_details
  }
});
