const { artists: dbArtists, track: dbTrack } = require('../db');

async function getArtists(artistIds) {
  return await Promise.all(
    artistIds.map((artistId) => dbArtists.getById(artistId))
  );
}

async function getTracks(trackIds) {
  const tracks = await Promise.all(
    trackIds.map((trackId) => dbTrack.info.getById(trackId))
  );

  const artistsList = await Promise.all(
    tracks.map((track) =>
      Promise.all(
        track.artist_list.map((artistId) => dbArtists.getById(artistId))
      )
    )
  );

  const result = tracks.map((track, index) => {
    track.artists = artistsList[index];
    return track;
  });

  return result;
}

async function getFull(items, getFunction, paramName) {
  const itemsList = await Promise.all(
    items.map((item) => getFunction(item[paramName]))
  );

  return items.map((item, index) => {
    item.artists = itemsList[index];
    return item;
  });
}

async function getFullAlbums(albums) {
  return await getFull(albums, getArtists, 'artist_list');
}

async function getFullPlaylists(playlists) {
  return await getFull(playlists, getTracks, 'track_list');
}

async function getFullTracks(tracks) {
  return await getFull(tracks, getArtists, 'artist_list');
}

module.exports = {
  getArtists,
  getFullAlbums,
  getTracks,
  getFullPlaylists,
  getFullTracks,
};
