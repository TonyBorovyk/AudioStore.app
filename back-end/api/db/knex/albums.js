const { DatabaseError } = require('../databaseError');
const {
  tables: { ALBUM, ARTIST },
} = require('../../config');

let knex;

async function create({ albumName, artistId, cover, artistList }) {
  const [result] = await knex(ALBUM)
    .insert({
      album_name: albumName,
      artist_id: artistId,
      cover,
      artist_list: artistList,
    })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(ALBUM)
    .join(ARTIST, `${ALBUM}.artist_id`, '=', `${ARTIST}.artist_id`)
    .select(
      `${ARTIST}.artist_id`,
      `${ARTIST}.artist_name`,
      `${ALBUM}.album_id`,
      `${ALBUM}.album_name`,
      `${ALBUM}.cover`,
      `${ALBUM}.artist_list`
    );
}

async function getMore(limit, page) {
  const [{ count }] = await knex(ALBUM).count();
  const offset = (page - 1) * limit;
  const albums = await knex(ALBUM)
    .join(ARTIST, `${ALBUM}.artist_id`, '=', `${ARTIST}.artist_id`)
    .select(
      `${ARTIST}.artist_id`,
      `${ARTIST}.artist_name`,
      `${ALBUM}.album_id`,
      `${ALBUM}.album_name`,
      `${ALBUM}.cover`,
      `${ALBUM}.artist_list`
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
    .where({ album_id: id })
    .join(ARTIST, `${ALBUM}.artist_id`, '=', `${ARTIST}.artist_id`)
    .select(
      `${ARTIST}.artist_id`,
      `${ARTIST}.artist_name`,
      `${ALBUM}.album_id`,
      `${ALBUM}.album_name`,
      `${ALBUM}.cover`,
      `${ALBUM}.artist_list`
    )
    .first();
  if (!album) {
    throw new DatabaseError(`No Album with id: ${id}`);
  }
  return album;
}

async function getByAlbumName(albumName) {
  const album = await knex(ALBUM)
    .where({ album_name: albumName })
    .join(ARTIST, `${ALBUM}.artist_id`, '=', `${ARTIST}.artist_id`)
    .select(
      `${ARTIST}.artist_id`,
      `${ARTIST}.artist_name`,
      `${ALBUM}.album_id`,
      `${ALBUM}.album_name`,
      `${ALBUM}.cover`,
      `${ALBUM}.artist_list`
    )
    .first();
  if (!album) {
    throw new DatabaseError(`No Album with albumName: ${albumName}`);
  }
  return album;
}

async function update({ albumId, artistId, cover, artistList }) {
  const updatedAlbum = {};

  if (artistId) updatedAlbum.artist_id = artistId;
  if (cover) updatedAlbum.cover = cover;
  if (artistList) updatedAlbum.artist_list = artistList;

  const [response] = await knex(ALBUM)
    .where({ album_id: albumId })
    .update(updatedAlbum)
    .returning('*');
  if (!response) {
    throw new DatabaseError(`No Album with albumId: ${albumId}`);
  }
  return response;
}

async function remove(id) {
  await knex(ALBUM).where({ album_id: id }).del();
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
