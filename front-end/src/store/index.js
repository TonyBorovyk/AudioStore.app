import { createStore } from "vuex";
import songs from "./modules/songs";
import song_details from "./modules/song_details";
import playlists from "./modules/playlists";
import log_in from "./modules/log_in";
import show_more from "./modules/show_more";
import artists from "./modules/artists";
import artist_details from "./modules/artist_details";
import albums from "./modules/albums";
import album_details from "./modules/album_details";

export default createStore({
  modules: {
    songs,
    playlists,
    log_in,
    song_details,
    show_more,
    artists,
    artist_details,
    albums,
    album_details
  }
});
