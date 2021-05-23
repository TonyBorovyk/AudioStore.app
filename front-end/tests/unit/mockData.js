export default{
    get GET_SONGS(){
        return [
            {
                "track_id":"1",
                "track_name":"Natural",
                "artists":[{
                    "artist_id":1,
                    "artist_name":"Imagine Dragons"
                }],
                "category":"Pop",
                "duration":"3:09",
                "song_cover":"https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b",
                "raiting":"7.5",
                "time_added":"1618058294",
                "track_url":"https://dl3.ru-music.cc/mp3/39995.mp3"
            },
            {
                "track_id":"2",
                "track_name":"Boomerang",
                "artists":[{
                    "artist_id":1,
                    "artist_name":"Imagine Dragons"
                }],
                "category":"Pop",
                "duration":"3:07",
                "song_cover":"https://i-tsmusic.com/i/img/songs/2031.jpg",
                "raiting":"7.5",
                "time_added":"1618061894",
                "track_url":"https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3"
            }
        ]
    },

    get GET_NEW_SONG() {
        return [ 
            {
            "track_id":"3",
            "track_name":"Test",
            "artists":[{
                "artist_id":1,
                "artist_name":"Imagine Dragons"
            }],
            "category":"Pop",
            "duration":"3:02",
            "song_cover":"https://i-tsmusic.com/i/img/songs/2031.jpg",
            "raiting":"7.5",
            "time_added":"1618061893",
            "track_url":"https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3"
        }]
    }
}