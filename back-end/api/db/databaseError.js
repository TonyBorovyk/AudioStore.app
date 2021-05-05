const {
  errors: { DATABASE },
} = require('../config');

class DatabaseError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }

    this.name = DATABASE;
  }
}

function checkError(err) {
  if (err.constraint === 'Room_fk0') {
    return new DatabaseError('ERROR: Room with this Admin_ID does not exist!');
  }

  if (err.constraint === 'Album_fk0') {
    return new DatabaseError('Album with this Artist_ID does not exist!');
  }

  if (err.constraint === 'Playlist_fk0') {
    return new DatabaseError('Playlist with this User_ID does not exist!');
  }

  if (err.constraint === 'Track_Info_fk0') {
    return new DatabaseError('Track_Info with this Album_ID does not exist!');
  }

  if (err.constraint === 'Track_Info_fk1') {
    return new DatabaseError('Track_Info with this Artist_ID does not exist!');
  }

  if (err.constraint === 'Track_Info_fk2') {
    return new DatabaseError(
      'Track_Info with this Category_ID does not exist!'
    );
  }

  return err;
}

module.exports = { checkError, DatabaseError };
