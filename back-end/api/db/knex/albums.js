const { DatabaseError } = require('../databaseError');
const {
  tables: { ALBUM, ARTIST },
} = require('../../config');

let knex;

async function create({ albumName, artistId, cover, artistList }) {
  const [result] = await knex(ALBUM)
    .insert({
      Album_Name: albumName,
      Artist_ID: artistId,
      Cover: cover,
      Artist_List: artistList,
    })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(ALBUM)
    .join(ARTIST, `${ALBUM}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${ARTIST}.Artist_Name`,
      `${ALBUM}.Album_Name`,
      `${ALBUM}.Cover`,
      `${ALBUM}.Artist_List`
    );
}

async function getMore(limit, page) {
  const [{ count }] = await knex(ALBUM).count();
  const offset = (page - 1) * limit;
  const albums = await knex(ALBUM)
    .join(ARTIST, `${ALBUM}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${ARTIST}.Artist_Name`,
      `${ALBUM}.Album_Name`,
      `${ALBUM}.Cover`,
      `${ALBUM}.Artist_List`
    )
    .limit(limit)
    .offset(offset);

  const total = Number(count);

  return {
    total: total,
    totalPages: Math.ceil(total / limit),
    albums,
  };
}

async function getById(id) {
  const album = await knex(ALBUM)
    .where({ Album_ID: id })
    .join(ARTIST, `${ALBUM}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${ARTIST}.Artist_Name`,
      `${ALBUM}.Album_Name`,
      `${ALBUM}.Cover`,
      `${ALBUM}.Artist_List`
    )
    .first();
  if (!album) {
    throw new DatabaseError(`No Album with id: ${id}`);
  }
  return album;
}

async function getByAlbumName(albumName) {
  const album = await knex(ALBUM)
    .where({ Album_Name: albumName })
    .join(ARTIST, `${ALBUM}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${ARTIST}.Artist_Name`,
      `${ALBUM}.Album_Name`,
      `${ALBUM}.Cover`,
      `${ALBUM}.Artist_List`
    )
    .first();
  if (!album) {
    throw new DatabaseError(`No Album with albumName: ${albumName}`);
  }
  return album;
}

async function update({ albumId, artistId, cover, artistList }) {
  const updatedAlbum = {};

  if (artistId) updatedAlbum.Artist_ID = artistId;
  if (cover) updatedAlbum.Cover = cover;
  if (artistList) updatedAlbum.Artist_List = artistList;

  const [response] = await knex(ALBUM)
    .where({ Album_ID: albumId })
    .update(updatedAlbum)
    .returning('*');
  if (!response) {
    throw new DatabaseError(`No Album with albumId: ${albumId}`);
  }
  return response;
}

async function remove(id) {
  await knex(ALBUM).where({ Album_ID: id }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    getMore,
    getById,
    getByAlbumName,
    update,
    remove,
  };
};
