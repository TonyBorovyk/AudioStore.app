const { DatabaseError } = require('../databaseError');
const {
  tables: { ROOM },
} = require('../../config');

let knex;

async function create({ adminId, roomName }) {
  const [result] = await knex(ROOM)
    .insert({
      admin_id: adminId,
      room_name: roomName,
    })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(ROOM).select('*');
}

async function getMore(limit, page) {
  const [{ count }] = await knex(ROOM).count();
  const offset = (page - 1) * limit;
  const rooms = await knex(ROOM).select('*').limit(limit).offset(offset);
  const total = Number(count);

  return {
    total: total,
    totalPages: Math.ceil(total / limit),
    rooms,
  };
}

async function getById(id) {
  const room = await knex(ROOM).where({ room_id: id }).select('*').first();
  if (!room) {
    throw new DatabaseError(`No Room with id: ${id}`);
  }
  return room;
}

async function getByRoomName(roomName) {
  const room = await knex(ROOM)
    .where({ room_name: roomName })
    .select('*')
    .first();
  if (!room) {
    throw new DatabaseError(`No Room with roomName: ${roomName}`);
  }
  return room;
}

async function update({ roomId, adminId, roomName }) {
  const updatedRoom = {};

  if (adminId) updatedRoom.admin_id = adminId;
  if (roomName) updatedRoom.room_name = roomName;

  const [response] = await knex(ROOM)
    .where({ room_id: roomId })
    .update(updatedRoom)
    .returning('*');
  if (!response) {
    throw new DatabaseError(`No Room with roomId: ${roomId}`);
  }
  return response;
}

async function remove(id, adminId) {
  await knex(ROOM).where({ room_id: id, admin_id: adminId }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    getById,
    getByRoomName,
    getMore,
    update,
    remove,
  };
};
