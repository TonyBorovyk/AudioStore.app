const {
  db: { config, defaultType },
} = require('../config');
const fatalError = require('../utils/fatalError.js');

const db = {};

let clientType = defaultType;

function funcWrapper(func) {
  if (typeof func === 'function') return func;

  return fatalError(
    `FATAL: Cannot find ${func.name || func} function for current DB wrapper`
  );
}

async function init() {
  try {
    for (const [k, v] of Object.entries(config)) {
      const wrapper = require(`./${k}`)(v);

      console.log(`INFO: DB wrapper for ${k} initiated`);

      db[k] = wrapper;
    }

    await dbWrapper().createDBWithTablesIfNotExists();
    await dbWrapper().testConnection();
  } catch (err) {
    fatalError(`FATAL: ${err.message || err}`);
  }
}

async function end() {
  for (const [k, v] of Object.entries(db)) {
    // eslint-disable-next-line no-await-in-loop
    await v.close();
    console.log(`INFO: DB wrapper for ${k} was closed`);
  }
}

function setClientType(t) {
  if (!t || !db[t]) {
    console.log('WARNING: Cannot find provided DB type');
    return false;
  }

  clientType = t;
  console.log(`INFO: The DB type has been changed to ${t}`);
  return true;
}

function getClientType() {
  return clientType;
}

function dbWrapper(t) {
  return db[t] || db[clientType];
}

function testConnection() {
  return funcWrapper(dbWrapper().testConnection)();
}
function close() {
  return funcWrapper(dbWrapper().close)();
}

// -----albums-------
function albumsCreate(album) {
  return funcWrapper(dbWrapper().albums.create)(album);
}
function albumsGetAll() {
  return funcWrapper(dbWrapper().albums.getAll)();
}
function albumsGetMore(limit, page) {
  return funcWrapper(dbWrapper().albums.getMore)(limit, page);
}
function albumsGetById(id) {
  return funcWrapper(dbWrapper().albums.getById)(id);
}
function albumsGetByAlbumName(albumName) {
  return funcWrapper(dbWrapper().albums.getById)(albumName);
}
function albumsUpdate(album) {
  return funcWrapper(dbWrapper().albums.update)(album);
}
function albumsRemove(id) {
  return funcWrapper(dbWrapper().albums.remove)(id);
}
// -----artists-------
function artistsCreate(artist) {
  return funcWrapper(dbWrapper().artists.create)(artist);
}
function artistsGetAll() {
  return funcWrapper(dbWrapper().artists.getAll)();
}
function artistsGetMore(limit, page) {
  return funcWrapper(dbWrapper().artists.getMore)(limit, page);
}
function artistsGetById(id) {
  return funcWrapper(dbWrapper().artists.getById)(id);
}
function artistsGetByArtistName(artistName) {
  return funcWrapper(dbWrapper().artists.getByArtistName)(artistName);
}
function artistsRemove(id) {
  return funcWrapper(dbWrapper().artists.remove)(id);
}
// -----playlist-------
function playlistCreate(playlist) {
  return funcWrapper(dbWrapper().playlist.create)(playlist);
}
function playlistGetAll() {
  return funcWrapper(dbWrapper().playlist.getAll)();
}
function playlistGetById(id, userId) {
  return funcWrapper(dbWrapper().playlist.getById)(id, userId);
}
function playlistGetByUserId(userId) {
  return funcWrapper(dbWrapper().playlist.getByUserId)(userId);
}
function playlistGetByPlaylistTitle(playlistTitle) {
  return funcWrapper(dbWrapper().playlist.getByUserId)(playlistTitle);
}
function playlistUpdate(playlist) {
  return funcWrapper(dbWrapper().playlist.update)(playlist);
}
function playlistRemove(id) {
  return funcWrapper(dbWrapper().playlist.remove)(id);
}
// -----track-------
function trackInfoCreate(trackInfo) {
  return funcWrapper(dbWrapper().track.info.create)(trackInfo);
}
function trackInfoGetAll(orderBy, sortDesk, limit, page) {
  return funcWrapper(dbWrapper().track.info.getAll)(
    orderBy,
    sortDesk,
    limit,
    page
  );
}
function trackInfoGetById(id) {
  return funcWrapper(dbWrapper().track.info.getById)(id);
}
function trackInfoGetByAlbumId(albumId) {
  return funcWrapper(dbWrapper().track.info.getByAlbumId)(albumId);
}
function trackInfoGetByArtistId(artistId) {
  return funcWrapper(dbWrapper().track.info.getByArtistId)(artistId);
}
function trackInfoUpdate(track) {
  return funcWrapper(dbWrapper().track.info.update)(track);
}
function trackInfoRemove(id) {
  return funcWrapper(dbWrapper().track.info.remove)(id);
}
function trackCategoryCreate(trackCategory) {
  return funcWrapper(dbWrapper().track.category.create)(trackCategory);
}
function trackCategoryGetAll() {
  return funcWrapper(dbWrapper().track.category.getAll)();
}
function trackCategoryGetById(id) {
  return funcWrapper(dbWrapper().track.category.getById)(id);
}
function trackCategoryGetByCategoryName(categoryName) {
  return funcWrapper(dbWrapper().track.category.getByCategoryName)(
    categoryName
  );
}
function trackCategoryRemove(id) {
  return funcWrapper(dbWrapper().track.category.remove)(id);
}
// -----users-------
function usersCreate(user) {
  return funcWrapper(dbWrapper().users.create)(user);
}
function usersGetAll() {
  return funcWrapper(dbWrapper().users.getAll)();
}
function usersGetById(id) {
  return funcWrapper(dbWrapper().users.getById)(id);
}
function usersGetByEmail(email) {
  return funcWrapper(dbWrapper().users.getByEmail)(email);
}
function usersEmailExists(email) {
  return funcWrapper(dbWrapper().users.emailExists)(email);
}
function usersUsernameExists(username) {
  return funcWrapper(dbWrapper().users.usernameExists)(username);
}
function usersRemove(id) {
  return funcWrapper(dbWrapper().users.remove)(id);
}
// -----rooms-------
function roomsCreate(room) {
  return funcWrapper(dbWrapper().rooms.create)(room);
}
function roomsGetAll() {
  return funcWrapper(dbWrapper().rooms.getAll)();
}
function roomsGetMore(limit, page) {
  return funcWrapper(dbWrapper().rooms.getMore)(limit, page);
}
function roomsGetById(id) {
  return funcWrapper(dbWrapper().rooms.getById)(id);
}
function roomsGetByRoomName(roomName) {
  return funcWrapper(dbWrapper().rooms.getByRoomName)(roomName);
}
function roomsUpdate(room) {
  return funcWrapper(dbWrapper().rooms.update)(room);
}
function roomsRemove(id, adminId) {
  return funcWrapper(dbWrapper().rooms.remove)(id, adminId);
}
// -----search-------
function searchGlobal(searchString) {
  return funcWrapper(dbWrapper().search.global)(searchString);
}
function searchSongs(searchString) {
  return funcWrapper(dbWrapper().search.songs)(searchString);
}

module.exports = {
  init,
  end,
  setClientType,
  getClientType,
  dbWrapper,
  // ------------------------------

  testConnection,
  close,

  // ------------------------------

  albums: {
    create: albumsCreate,
    getAll: albumsGetAll,
    getMore: albumsGetMore,
    getById: albumsGetById,
    getByAlbumName: albumsGetByAlbumName,
    update: albumsUpdate,
    remove: albumsRemove,
  },

  artists: {
    create: artistsCreate,
    getAll: artistsGetAll,
    getMore: artistsGetMore,
    getById: artistsGetById,
    getByArtistName: artistsGetByArtistName,
    remove: artistsRemove,
  },

  playlist: {
    create: playlistCreate,
    getAll: playlistGetAll,
    getById: playlistGetById,
    getByUserId: playlistGetByUserId,
    getByPlaylistTitle: playlistGetByPlaylistTitle,
    update: playlistUpdate,
    remove: playlistRemove,
  },

  track: {
    info: {
      create: trackInfoCreate,
      getAll: trackInfoGetAll,
      getById: trackInfoGetById,
      getByAlbumId: trackInfoGetByAlbumId,
      getByArtistId: trackInfoGetByArtistId,
      update: trackInfoUpdate,
      remove: trackInfoRemove,
    },
    category: {
      create: trackCategoryCreate,
      getAll: trackCategoryGetAll,
      getById: trackCategoryGetById,
      getByCategoryName: trackCategoryGetByCategoryName,
      remove: trackCategoryRemove,
    },
  },

  users: {
    create: usersCreate,
    getAll: usersGetAll,
    getById: usersGetById,
    getByEmail: usersGetByEmail,
    emailExists: usersEmailExists,
    usernameExists: usersUsernameExists,
    remove: usersRemove,
  },

  rooms: {
    create: roomsCreate,
    getAll: roomsGetAll,
    getMore: roomsGetMore,
    getById: roomsGetById,
    getByRoomName: roomsGetByRoomName,
    update: roomsUpdate,
    remove: roomsRemove,
  },

  search: {
    global: searchGlobal,
    songs: searchSongs,
  },
};
