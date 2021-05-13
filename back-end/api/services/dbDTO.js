function albumAdd(album) {
  const albumList = Object.entries(album).map(([key, value]) => {
    if (key === 'artist_list') {
      return [key, `[${value.join(', ')}]`];
    }
    return [key, value];
  });

  return Object.fromEntries(albumList);
}

function albumGet(album) {
  album.artist_list = JSON.parse(album.artist_list);
  return album;
}

function playlistAdd(playlist) {
  const playlistList = Object.entries(playlist).map(([key, value]) => {
    if (key === 'track_list') {
      return [key, `[${value.join(', ')}]`];
    }
    return [key, value];
  });

  return Object.fromEntries(playlistList);
}

function playlistGet(playlist) {
  playlist.track_list = JSON.parse(playlist.track_list);
  return playlist;
}

function trackAdd(track) {
  const trackList = Object.entries(track).map(([key, value]) => {
    if (key === 'artist_list') {
      return [key, `[${value.join(', ')}]`];
    }
    return [key, value];
  });

  return Object.fromEntries(trackList);
}

function trackGet(track) {
  track.artist_list = JSON.parse(track.artist_list);
  return track;
}

module.exports = {
  albumAdd,
  albumGet,
  playlistAdd,
  playlistGet,
  trackAdd,
  trackGet,
};
