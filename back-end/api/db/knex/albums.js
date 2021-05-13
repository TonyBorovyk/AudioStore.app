const { DatabaseError } = require('../databaseError');
const {
  tables: { ALBUM, ARTIST },
} = require('../../config');
const {
  dbDTO: { albumAdd: addDTO, albumGet: getDTO },
} = require('../../services');

let knex;

async function create(newAlbum) {
  const [result] = await knex(ALBUM).insert(addDTO(newAlbum)).returning('*');
  return getDTO(result);
}

async function getAll() {
  const result = await knex(ALBUM)
    .join(ARTIST, `${ALBUM}.artist_id`, '=', `${ARTIST}.artist_id`)
    .select(
      `${ARTIST}.artist_id`,
      `${ARTIST}.artist_name`,
      `${ALBUM}.album_id`,
      `${ALBUM}.album_name`,
      `${ALBUM}.cover`,
      `${ALBUM}.artist_list`
    );

  return result.map(getDTO);
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
    albums: albums.map(getDTO),
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
  return getDTO(album);
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
  return getDTO(album);
}

async function update({ album_id: albumId, ...album }) {
  const updatedAlbum = addDTO(album);

  const [response] = await knex(ALBUM)
    .where({ album_id: albumId })
    .update(updatedAlbum)
    .returning('*');
  if (!response) {
    throw new DatabaseError(`No Album with albumId: ${albumId}`);
  }
  return getDTO(response);
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
