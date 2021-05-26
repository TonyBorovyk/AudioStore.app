process.env.NODE_ENV = 'test';

const fastify = require('fastify');
const routes = require('../songs');
const {
    albums: dbAlbums,
    artists: dbArtists,
    track: dbTrack,
} = require('../../db');
const getTransform = require('../../services/transform');

const app = fastify();
routes(app);

dbAlbums.getByAlbumName = jest.fn().mockReturnValue({
    artist_id: 1,
    artist_name: 'Imagine Dragons',
    album_id: 1,
    album_name: 'Origins',
    cover:
        'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
    artist_list: '[1, 2]',
});

dbArtists.getById = jest.fn().mockReturnValue({
    artist_id: 1,
    artist_name: 'Imagine Dragons',
});

dbArtists.getByArtistName = jest.fn().mockReturnValue({
    artist_id: 1,
    artist_name: 'Imagine Dragons',
});

dbTrack.category.getByCategoryName = jest.fn().mockReturnValue({
    category_id: 1,
    category_name: 'Pop rock',
});

dbTrack.info.create = jest.fn().mockReturnValue([
    {
        album_id: 1,
        track_id: 1,
        artist_id: 1,
        category_id: 1,
        track_name: 'Boomerang',
        lyrics:
            'How many lies do we have to tell?\n To keep from saying that I wish you well\n How many times, I said I\'\'m moving on?\n How many times that false alarm goes off (goes off), goes off (goes off)?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n How many tears do we have to cry?\n How many sleepless lonely nights?\n To work it out, is it worth it now?\n Should we go ahead or should we turn around?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Just because it isn\'\'t easy, doesn\'\'t mean that it is wrong\n Everything that we have been working on, working on so long\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomer-boomer-boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw (boomerang)\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang',
        duration: '3:07',
        cover: 'https://i-tsmusic.com/i/img/songs/2031.jpg',
        release_year: 2018,
        time_added: '2021-05-16 16:00:00',
        track_url:
            'https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3',
        artist_list: [1],
    },
    {
        album_id: 1,
        track_id: 2,
        artist_id: 1,
        category_id: 1,
        track_name: 'Natural',
        lyrics:
            'Will you hold the line?\n When every one of them has given up and given in, tell me\n In this house of mine\n Nothing ever comes without a consequence or cost, tell me\n Will the stars align?\n Will heaven step in will it save us from our sin, will it?\n \'\'Cause this house of mine stands strong\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Will somebody\n Let me see the light within the dark trees shadowing\n What\'\'s happening?\n Looking through the glass find the wrong within the past knowing\n Oh, we are the youth\n Cut until it bleeds inside a world without the peace, face it\n A bit of the truth, the truth\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Deep inside me\n I\'\'m fading to black I\'\'m fading\n Took an oath by the blood on my hand won\'\'t break it\n I can taste it the end is upon us I swear\n Gonna make it\n I\'\'m gonna make it\n Natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Natural\n Yeah, you\'\'re a natural',
        duration: '3:07',
        cover:
            'https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b',
        release_year: 2018,
        time_added: '2021-05-16 16:00:00',
        track_url: 'https://dl3.ru-music.cc/mp3/39995.mp3',
        artist_list: [1],
    },
]);

dbTrack.info.getById = jest.fn().mockReturnValue({
    category_name: 'Pop rock',
    album_name: 'Origins',
    album_cover:
        'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
    artist_name: 'Imagine Dragons',
    album_id: 1,
    track_id: 2,
    artist_id: 1,
    category_id: 1,
    track_name: 'Natural',
    lyrics:
        'Will you hold the line?\n When every one of them has given up and given in, tell me\n In this house of mine\n Nothing ever comes without a consequence or cost, tell me\n Will the stars align?\n Will heaven step in will it save us from our sin, will it?\n \'\'Cause this house of mine stands strong\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Will somebody\n Let me see the light within the dark trees shadowing\n What\'\'s happening?\n Looking through the glass find the wrong within the past knowing\n Oh, we are the youth\n Cut until it bleeds inside a world without the peace, face it\n A bit of the truth, the truth\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Deep inside me\n I\'\'m fading to black I\'\'m fading\n Took an oath by the blood on my hand won\'\'t break it\n I can taste it the end is upon us I swear\n Gonna make it\n I\'\'m gonna make it\n Natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Natural\n Yeah, you\'\'re a natural',
    duration: '3:07',
    cover:
        'https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b',
    release_year: 2018,
    time_added: '2021-05-16 16:00:00',
    track_url: 'https://dl3.ru-music.cc/mp3/39995.mp3',
    artist_list: [1],
});

dbTrack.info.getByAlbumId = jest.fn().mockReturnValue([
    {
        category_name: 'Pop rock',
        album_name: 'Origins',
        album_cover:
            'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
        artist_name: 'Imagine Dragons',
        album_id: 1,
        track_id: 1,
        artist_id: 1,
        category_id: 1,
        track_name: 'Boomerang',
        lyrics:
            'How many lies do we have to tell?\n To keep from saying that I wish you well\n How many times, I said I\'\'m moving on?\n How many times that false alarm goes off (goes off), goes off (goes off)?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n How many tears do we have to cry?\n How many sleepless lonely nights?\n To work it out, is it worth it now?\n Should we go ahead or should we turn around?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Just because it isn\'\'t easy, doesn\'\'t mean that it is wrong\n Everything that we have been working on, working on so long\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomer-boomer-boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw (boomerang)\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang',
        duration: '3:07',
        cover: 'https://i-tsmusic.com/i/img/songs/2031.jpg',
        release_year: 2018,
        time_added: '2021-05-16 16:00:00',
        track_url:
            'https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3',
        artist_list: [1],
    },
    {
        category_name: 'Pop rock',
        album_name: 'Origins',
        album_cover:
            'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
        artist_name: 'Imagine Dragons',
        album_id: 1,
        track_id: 2,
        artist_id: 1,
        category_id: 1,
        track_name: 'Natural',
        lyrics:
            'Will you hold the line?\n When every one of them has given up and given in, tell me\n In this house of mine\n Nothing ever comes without a consequence or cost, tell me\n Will the stars align?\n Will heaven step in will it save us from our sin, will it?\n \'\'Cause this house of mine stands strong\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Will somebody\n Let me see the light within the dark trees shadowing\n What\'\'s happening?\n Looking through the glass find the wrong within the past knowing\n Oh, we are the youth\n Cut until it bleeds inside a world without the peace, face it\n A bit of the truth, the truth\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Deep inside me\n I\'\'m fading to black I\'\'m fading\n Took an oath by the blood on my hand won\'\'t break it\n I can taste it the end is upon us I swear\n Gonna make it\n I\'\'m gonna make it\n Natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Natural\n Yeah, you\'\'re a natural',
        duration: '3:07',
        cover:
            'https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b',
        release_year: 2018,
        time_added: '2021-05-16 16:00:00',
        track_url: 'https://dl3.ru-music.cc/mp3/39995.mp3',
        artist_list: [1],
    },
]);

dbTrack.info.getByArtistId = jest.fn().mockReturnValue([
    {
        category_name: 'Pop rock',
        album_name: 'Origins',
        album_cover:
            'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
        artist_name: 'Imagine Dragons',
        album_id: 1,
        track_id: 1,
        artist_id: 1,
        category_id: 1,
        track_name: 'Boomerang',
        lyrics:
            'How many lies do we have to tell?\n To keep from saying that I wish you well\n How many times, I said I\'\'m moving on?\n How many times that false alarm goes off (goes off), goes off (goes off)?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n How many tears do we have to cry?\n How many sleepless lonely nights?\n To work it out, is it worth it now?\n Should we go ahead or should we turn around?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Just because it isn\'\'t easy, doesn\'\'t mean that it is wrong\n Everything that we have been working on, working on so long\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomer-boomer-boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw (boomerang)\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang',
        duration: '3:07',
        cover: 'https://i-tsmusic.com/i/img/songs/2031.jpg',
        release_year: 2018,
        time_added: '2021-05-16 16:00:00',
        track_url:
            'https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3',
        artist_list: [1],
    },
    {
        category_name: 'Pop rock',
        album_name: 'Origins',
        album_cover:
            'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
        artist_name: 'Imagine Dragons',
        album_id: 1,
        track_id: 2,
        artist_id: 1,
        category_id: 1,
        track_name: 'Natural',
        lyrics:
            'Will you hold the line?\n When every one of them has given up and given in, tell me\n In this house of mine\n Nothing ever comes without a consequence or cost, tell me\n Will the stars align?\n Will heaven step in will it save us from our sin, will it?\n \'\'Cause this house of mine stands strong\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Will somebody\n Let me see the light within the dark trees shadowing\n What\'\'s happening?\n Looking through the glass find the wrong within the past knowing\n Oh, we are the youth\n Cut until it bleeds inside a world without the peace, face it\n A bit of the truth, the truth\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Deep inside me\n I\'\'m fading to black I\'\'m fading\n Took an oath by the blood on my hand won\'\'t break it\n I can taste it the end is upon us I swear\n Gonna make it\n I\'\'m gonna make it\n Natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Natural\n Yeah, you\'\'re a natural',
        duration: '3:07',
        cover:
            'https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b',
        release_year: 2018,
        time_added: '2021-05-16 16:00:00',
        track_url: 'https://dl3.ru-music.cc/mp3/39995.mp3',
        artist_list: [1],
    },
]);

dbTrack.info.getAll = jest.fn().mockReturnValue({
    total: 2,
    totalPages: 2,
    tracks: [
        {
            album_id: 1,
            track_id: 1,
            artist_id: 1,
            category_id: 1,
            track_name: 'Boomerang',
            lyrics:
                'How many lies do we have to tell?\n To keep from saying that I wish you well\n How many times, I said I\'\'m moving on?\n How many times that false alarm goes off (goes off), goes off (goes off)?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n How many tears do we have to cry?\n How many sleepless lonely nights?\n To work it out, is it worth it now?\n Should we go ahead or should we turn around?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Just because it isn\'\'t easy, doesn\'\'t mean that it is wrong\n Everything that we have been working on, working on so long\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomer-boomer-boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw (boomerang)\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang',
            duration: '3:07',
            cover: 'https://i-tsmusic.com/i/img/songs/2031.jpg',
            release_year: 2018,
            time_added: '2021-05-16 16:00:00',
            track_url:
                'https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3',
            artist_list: [1],
        },
        {
            album_id: 1,
            track_id: 2,
            artist_id: 1,
            category_id: 1,
            track_name: 'Natural',
            lyrics:
                'Will you hold the line?\n When every one of them has given up and given in, tell me\n In this house of mine\n Nothing ever comes without a consequence or cost, tell me\n Will the stars align?\n Will heaven step in will it save us from our sin, will it?\n \'\'Cause this house of mine stands strong\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Will somebody\n Let me see the light within the dark trees shadowing\n What\'\'s happening?\n Looking through the glass find the wrong within the past knowing\n Oh, we are the youth\n Cut until it bleeds inside a world without the peace, face it\n A bit of the truth, the truth\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Deep inside me\n I\'\'m fading to black I\'\'m fading\n Took an oath by the blood on my hand won\'\'t break it\n I can taste it the end is upon us I swear\n Gonna make it\n I\'\'m gonna make it\n Natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Natural\n Yeah, you\'\'re a natural',
            duration: '3:07',
            cover:
                'https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b',
            release_year: 2018,
            time_added: '2021-05-16 16:00:00',
            track_url: 'https://dl3.ru-music.cc/mp3/39995.mp3',
            artist_list: [1],
        },
    ],
});

dbTrack.info.update = jest.fn().mockReturnValue([
    {
        album_id: 1,
        track_id: 1,
        artist_id: 1,
        category_id: 1,
        track_name: 'Boomerang',
        lyrics:
            'How many lies do we have to tell?\n To keep from saying that I wish you well\n How many times, I said I\'\'m moving on?\n How many times that false alarm goes off (goes off), goes off (goes off)?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n How many tears do we have to cry?\n How many sleepless lonely nights?\n To work it out, is it worth it now?\n Should we go ahead or should we turn around?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Just because it isn\'\'t easy, doesn\'\'t mean that it is wrong\n Everything that we have been working on, working on so long\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomer-boomer-boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw (boomerang)\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang',
        duration: '3:07',
        cover: 'https://i-tsmusic.com/i/img/songs/2031.jpg',
        release_year: 2018,
        time_added: '2021-05-16 16:00:00',
        track_url:
            'https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3',
        artist_list: [1, 2],
    },
    {
        album_id: 1,
        track_id: 2,
        artist_id: 1,
        category_id: 1,
        track_name: 'Natural',
        lyrics:
            'Will you hold the line?\n When every one of them has given up and given in, tell me\n In this house of mine\n Nothing ever comes without a consequence or cost, tell me\n Will the stars align?\n Will heaven step in will it save us from our sin, will it?\n \'\'Cause this house of mine stands strong\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Will somebody\n Let me see the light within the dark trees shadowing\n What\'\'s happening?\n Looking through the glass find the wrong within the past knowing\n Oh, we are the youth\n Cut until it bleeds inside a world without the peace, face it\n A bit of the truth, the truth\n That\'\'s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you\'\'re standing on the edge face up\n \'\'Cause you\'\'re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Deep inside me\n I\'\'m fading to black I\'\'m fading\n Took an oath by the blood on my hand won\'\'t break it\n I can taste it the end is upon us I swear\n Gonna make it\n I\'\'m gonna make it\n Natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you\'\'re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you\'\'re a natural\n Natural\n Yeah, you\'\'re a natural',
        duration: '3:07',
        cover:
            'https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b',
        release_year: 2018,
        time_added: '2021-05-16 16:00:00',
        track_url: 'https://dl3.ru-music.cc/mp3/39995.mp3',
        artist_list: [1],
    },
]);

dbTrack.info.remove = jest.fn();

describe('Test the root path', () => {
    test('It should response the POST method', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/',
            body: {
                album_name: 'Origins',
                artist_name: 'Imagine Dragons',
                category_name: 'Pop rock',
                track_id: 1,
                album_id: 1,
                artist_id: 1,
                category_id: 1,
                track_name: 'Boomerang',
                lyrics:
                    'How many lies do we have to tell?\n To keep from saying that I wish you well\n How many times, I said I\'\'m moving on?\n How many times that false alarm goes off (goes off), goes off (goes off)?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n How many tears do we have to cry?\n How many sleepless lonely nights?\n To work it out, is it worth it now?\n Should we go ahead or should we turn around?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Just because it isn\'\'t easy, doesn\'\'t mean that it is wrong\n Everything that we have been working on, working on so long\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomer-boomer-boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw (boomerang)\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang',
                duration: '3:07',
                cover: 'https://i-tsmusic.com/i/img/songs/2031.jpg',
                release_year: 2018,
                time_added: '2021-05-16 16:00:00',
                track_url:
                    'https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3',
                artist_list: [1],
            },
        });
        console.log(response.body);
        expect(response.statusCode).toBe(201);
    });

    test('It should response the POST method', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/add',
            body: {
                track_id: 1,
                artist_id: 2,
            },
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });

    test('It should response the GET method', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/',
            query: {
                limit: 2,
                page: 1,
                order_by: 'album_id',
                sort_desk: 'true',
            },
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });

    test('It should response the GET method', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/album',
            query: {
                album_id: 1,
            },
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });

    test('It should response the GET method', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/artist',
            query: {
                artist_id: 1,
            },
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });
    test('It should response the GET method', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/:id',
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });
    test('It should response the DELETE method', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: '/:id',
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });
});
