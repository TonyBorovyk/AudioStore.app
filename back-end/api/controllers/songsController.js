/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const { getSongsByOrder } = require('../services/songsService');
const { getAlbumById } = require('../services/albumsService');
const { getArtistById } = require('../services/artistsService');

const getSongs = async (req, res, next) => {
  try {
    const data = await getSongsByOrder(
      // eslint-disable-next-line comma-dangle
      (req.body && req.body.order_by) || 'time_added'
    );
    for (let i = 0; i < data.songs.length; i++) {
      const artists_obj = [];
      data.songs[i].album = await getAlbumById(data.songs[i].album);
      for (let j = 0; j < data.songs[i].artists.length; j++) {
        const artist = await getArtistById(data.songs[i].artists[i]);
        await artists_obj.push(artist);
      }
      data.songs[i].artists = artists_obj;
    }
    res.send(data);
    next();
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getSongs,
  //   getSong,
};
