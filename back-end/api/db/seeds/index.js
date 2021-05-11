const Knex = require('knex');

const {
  db: {
    config: { knex: knexConfig },
  },
} = require('../../config');

const knex = new Knex(knexConfig);

async function plantSeeds() {
  try {
    await knex.raw(`
      CREATE OR REPLACE FUNCTION "Insert_Artist"(
        "Artist_Name_new" varchar(70)
      ) RETURNS VOID AS
      $$
      BEGIN
          INSERT INTO "artist" ("artist_name")
        VALUES ("Artist_Name_new");
      END
      $$
        LANGUAGE 'plpgsql';


      CREATE OR REPLACE FUNCTION "Insert_Track_Category"(
        "Category_Name_new" varchar(70)
      ) RETURNS VOID AS
      $$
      BEGIN
          INSERT INTO "track_category" ("category_name")
        VALUES ("Category_Name_new");
      END
      $$
        LANGUAGE 'plpgsql';


      CREATE OR REPLACE FUNCTION "Insert_User"(
          "First_name_new" varchar(60),
          "Last_name_new" varchar(70),
          "UserName_new" varchar(60),
          "Email_new" varchar(100),
          "Password_new" varchar(50),
          "Role_new" varchar(10)
      ) RETURNS VOID AS
      $$
      BEGIN
          INSERT INTO "user" ("first_name", "last_name", "username", "email", "password", "role")
        VALUES ("First_name_new", "Last_name_new", "UserName_new", "Email_new", "Password_new", "Role_new");
      END
      $$
        LANGUAGE 'plpgsql';


      CREATE OR REPLACE FUNCTION "Insert_Room"(
          "Admin_ID_new" bigint,
          "Room_Name_new" varchar(255)
      ) RETURNS VOID AS
      $$
      BEGIN
          INSERT INTO "room" ("admin_id", "room_name")
        VALUES ("Admin_ID_new", "Room_Name_new");
      END
      $$
        LANGUAGE 'plpgsql';


      CREATE OR REPLACE FUNCTION "Insert_Album"(
          "Album_Name_new" varchar(70),
          "Artist_Name_new" varchar(70),
          "Cover_new" TEXT,
          "Artist_List_new" TEXT
      ) RETURNS VOID AS
      $$
      BEGIN
          INSERT INTO "album" ("album_name", "artist_id", "cover", "artist_list")
        VALUES ("Album_Name_new", (SELECT "artist_id" FROM "artist" WHERE "artist_name" = "Artist_Name_new"), "Cover_new", "Artist_List_new");
      END
      $$
        LANGUAGE 'plpgsql';


      CREATE OR REPLACE FUNCTION "Insert_Track_Info"(
          "Album_Name_new" varchar(70),
          "Artist_Name_new" varchar(70),
          "Category_Name_new" varchar(70),
          "Track_name_new" varchar(100),
          "Lyrics_new" TEXT,
          "Duration_new" varchar(40),
          "Cover_new" TEXT,
          "Release_year_new" int,
          "Track_URL_new" TEXT,
          "Artist_List_new" TEXT
      ) RETURNS VOID AS
      $$
      BEGIN
          INSERT INTO "track_info" ("album_id", "artist_id", "category_id", "track_name", "lyrics", "duration", "cover", "release_year", "time_added", "track_url", "artist_list")
        VALUES ((SELECT "album_id" FROM "album" WHERE "album_name" = "Album_Name_new"), (SELECT "artist_id" FROM "artist" WHERE "artist_name" = "Artist_Name_new"), (SELECT "category_id" FROM "track_category" WHERE "category_name" = "Category_Name_new"), "Track_name_new", "Lyrics_new", "Duration_new", "Cover_new", "Release_year_new", NOW(), "Track_URL_new", "Artist_List_new");
      END
      $$
        LANGUAGE 'plpgsql';


      CREATE OR REPLACE FUNCTION "Insert_Playlist"(
          "Playlist_title_new" varchar(80),
          "User_ID_new" bigint,
          "Track_List_new" TEXT
      ) RETURNS VOID AS
      $$
      BEGIN
          INSERT INTO "playlist" ("playlist_title", "user_id", "last_update", "track_list")
        VALUES ("Playlist_title_new", "User_ID_new", NOW(), "Track_List_new");
      END
      $$
        LANGUAGE 'plpgsql';


      CREATE OR REPLACE FUNCTION "Update_Playlist"("Playlist_title_new" varchar(80), "Track_List_new" TEXT) RETURNS VOID AS
      $$
      BEGIN
        UPDATE "playlist"
          SET "track_list" = "Track_List_new", "last_update" = NOW()
        WHERE ("playlist_title" = "Playlist_title_new");
      END
      $$
        LANGUAGE 'plpgsql';

      SELECT "Insert_Artist" ('Imagine Dragons');

      SELECT "Insert_Artist" ('The Chainsmokers');

      SELECT "Insert_Artist" ('Queen');

      SELECT "Insert_Artist" ('Twenty One Pilots');

      SELECT "Insert_Track_Category" ('Pop rock');

      SELECT "Insert_Track_Category" ('Classic rock');

      SELECT "Insert_Track_Category" ('Alternative hip hop');

      SELECT "Insert_User" ('Mykola', 'Onyshchuk', 'nick1', 'mykolaon1@gmail.com', 'user1234', 'base');

      SELECT "Insert_User" ('Anton', 'Borovyk', 'anton', 'antonbovik@gmail.com', 'user1234', 'base');

      SELECT "Insert_User" ('Alexey', '', 'alexeykharenko', 'alexey@gmail.com', 'user1234', 'base');

      SELECT "Insert_User" ('Alexey', '', 'alexkharenko', 'alexey16052002@gmail.com', 'user1234', 'base');

      SELECT "Insert_User" ('Alexey', '', 'aleykharenko', 'alexey052002@gmail.com', 'user1234', 'base');

      SELECT "Insert_Room" (1, 'Room1');

      SELECT "Insert_Room" (2, 'Room_Anton');

      SELECT "Insert_Room" (3, 'Room_Alexey');

      SELECT "Insert_Room" (5, 'room_Alexey');

      SELECT "Insert_Album" ('Origins', 'Imagine Dragons', 'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg', '[1, 2]');

      SELECT "Insert_Album" ('Greatest Hits', 'Queen', 'https://www.udiscovermusic.com/wp-content/uploads/2017/11/Queen-Greatest-Hits.jpg', '[3]');

      SELECT "Insert_Album" ('Blurryface', 'Twenty One Pilots', 'https://uk.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Twenty_One_Pilots_-_Blurryface.png#/media/Файл:Twenty_One_Pilots_-_Blurryface.png', '[4]');

      SELECT "Insert_Album" ('Chlorine', 'Twenty One Pilots', 'https://vinylclub.com.ua/inc/uploads/2018/11/3d9f1b83-fb19-11e8-80e5-00163e233d69-1.jpg', '[4]');

      SELECT "Insert_Track_Info" ('Origins', 'Imagine Dragons', 'Pop rock', 'Boomerang', 'How many lies do we have to tell?\n To keep from saying that I wish you well\n How many times, I said I''m moving on?\n How many times that false alarm goes off (goes off), goes off (goes off)?\n I know, I''ll see you tomorrow\n ''Cause I''m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I''m ready to go, ready to go\n Ready to throw, ready to throw\n You''re my boomerang, boomerang\n You''re my boomerang, boomerang\n How many tears do we have to cry?\n How many sleepless lonely nights?\n To work it out, is it worth it now?\n Should we go ahead or should we turn around?\n I know, I''ll see you tomorrow\n ''Cause I''m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I''m ready to go, ready to go\n Ready to throw, ready to throw\n You''re my boomerang, boomerang\n You''re my boomerang, boomerang\n Just because it isn''t easy, doesn''t mean that it is wrong\n Everything that we have been working on, working on so long\n You''re my boomerang, boomerang\n You''re my boomerang, boomerang\n You''re my boomerang, boomerang\n You''re my boomer-boomer-boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I''m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw\n You''re my boomerang, boomerang\n You''re my boomerang, boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I''m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw (boomerang)\n You''re my boomerang, boomerang\n You''re my boomerang, boomerang', '3:07', 'https://i-tsmusic.com/i/img/songs/2031.jpg', 2018, 'https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3', '[1]');

      SELECT "Insert_Track_Info" ('Origins', 'Imagine Dragons', 'Pop rock', 'Natural', 'Will you hold the line?\n When every one of them has given up and given in, tell me\n In this house of mine\n Nothing ever comes without a consequence or cost, tell me\n Will the stars align?\n Will heaven step in will it save us from our sin, will it?\n ''Cause this house of mine stands strong\n That''s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you''re standing on the edge face up\n ''Cause you''re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you''re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you''re a natural\n Will somebody\n Let me see the light within the dark trees shadowing\n What''s happening?\n Looking through the glass find the wrong within the past knowing\n Oh, we are the youth\n Cut until it bleeds inside a world without the peace, face it\n A bit of the truth, the truth\n That''s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you''re standing on the edge face up\n ''Cause you''re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you''re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you''re a natural\n Deep inside me\n I''m fading to black I''m fading\n Took an oath by the blood on my hand won''t break it\n I can taste it the end is upon us I swear\n Gonna make it\n I''m gonna make it\n Natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you''re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you''re a natural\n Natural\n Yeah, you''re a natural', '3:07', 'https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b', 2018, 'https://dl3.ru-music.cc/mp3/39995.mp3', '[1]');

      SELECT "Insert_Track_Info" ('Greatest Hits', 'Queen', 'Classic rock', 'Bohemian Rhapsody', 'Is this the real life?\n Is this just fantasy?\n Caught in a landside,\n No escape from reality\n Open your eyes,\n Look up to the skies and see,\n I''m just a poor boy, I need no sympathy,\n Because I''m easy come, easy go,\n Little high, little low,\n Any way the wind blows doesn''t really matter to\n Me, to me\n Mamaaa,\n Just killed a man,\n Put a gun against his head, pulled my trigger,\n Now he''s dead\n Mamaaa, life had just begun,\n But now I''ve gone and thrown it all away\n Mama, oooh,\n Didn''t mean to make you cry,\n If I''m not back again this time tomorrow,\n Carry on, carry on as if nothing really matters\n Too late, my time has come,\n Sends shivers down my spine, body''s aching all\n The time\n Goodbye, everybody, I''ve got to go,\n Gotta leave you all behind and face the truth\n Mama, oooh\n I don''t want to die,\n I sometimes wish I''d never been born at all.\n I see a little silhouetto of a man,\n Scaramouch, Scaramouch, will you do the Fandango!\n Thunderbolts and lightning, very, very frightening me\n Galileo, Galileo\n Galileo, Galileo\n Galileo, Figaro - magnificoo\n I''m just a poor boy nobody loves me\n He''s just a poor boy from a poor family,\n Spare him his life from this monstrosity\n Easy come, easy go, will you let me go\n Bismillah! No, we will not let you go\n (Let him go!) Bismillah! We will not let you go\n (Let him go!) Bismillah! We will not let you go\n (Let me go) Will not let you go\n (Let me go)(Never) Never let you go\n (Let me go) (Never) let you go (Let me go) Ah\n No, no, no, no, no, no, no\n Oh mama mia, mama mia, mama mia, let me go\n Beelzebub has a devil put aside for me, for me,\n For meee\n So you think you can stop me and spit in my eye\n So you think you can love me and leave me to die\n Oh, baby, can''t do this to me, baby,\n Just gotta get out, just gotta get right outta here\n Nothing really matters, Anyone can see,\n Nothing really matters,\n Nothing really matters to me\n Any way the wind blows...', '5:55', 'https://www.lololyrics.com/img/cover/23106.jpeg', 1979, 'https://www.ostmusic.org/?view=file&format=raw&id=11379', '[3]');

      SELECT "Insert_Track_Info" ('Greatest Hits', 'Queen', 'Classic rock', 'We Will Rock You', 'Buddy, you''re a boy, make a big noise\n Playing in the street, gonna be a big man someday\n You got mud on your face, you big disgrace\n Kicking your can all over the place, singin''\n We will, we will rock you\n We will, we will rock you\n Buddy, you''re a young man, hard man\n Shouting in the street, gonna take on the world someday\n You got blood on your face, you big disgrace\n Waving your banner all over the place\n We will, we will rock you, sing it!\n We will, we will rock you, yeah\n Buddy, you''re an old man, poor man\n Pleading with your eyes, gonna get you some peace someday\n You got mud on your face, big disgrace\n Somebody better put you back into your place, do it!\n We will, we will rock you, yeah, yeah, come on\n We will, we will rock you, alright, louder!\n We will, we will rock you, one more time\n We will, we will rock you\n Yeah', '2:02', 'https://en.wikipedia.org/wiki/File:We_Will_Rock_You_by_Queen_(1977_French_single).png#/media/File:We_Will_Rock_You_by_Queen_(1977_French_single).png', 1977, 'https://www.ostmusic.org/?view=file&format=raw&id=11379', '[3]');

      SELECT "Insert_Track_Info" ('Blurryface', 'Twenty One Pilots', 'Alternative hip hop', 'Stressed Out', 'I wish I found some better sounds\n No one''s ever heard\n I wish I had a better voice\n That sang some better words\n I wish I found some chords\n In an order that is new\n I wish I didn''t have to rhyme\n Every time I sang\n I was told when I get older\n All my fears would shrink\n But now I''m insecure\n And I care what people think\n My name''s Blurryface and I care what you think\n My name''s Blurryface and I care what you think\n Wish we could turn back time\n To the good old days\n When our momma sang us to sleep\n But now we''re stressed out\n Wish we could turn back time\n To the good old days\n When our momma sang us to sleep\n But now we''re stressed out\n We''re stressed out\n Sometimes a certain smell will\n Take me back to when I was young\n How come I''m never able to identify\n Where it''s coming from?\n I''d make a candle out of it\n If I ever found it\n Try to sell it, never sell out of it\n I''d probably only sell one\n It''d be to my brother, cause we have the same nose\n Same clothes, home grown\n The stone''s throw from a creek we used to roam\n But it would remind us of when\n Nothing really mattered\n Out of student loans and tree house homes\n We all would take the latter\n My name''s Blurryface and I care what you think\n My name''s Blurryface and I care what you think\n Wish we could turn back time\n To the good old days\n When our momma sang us to sleep\n But now we''re stressed out\n Wish we could turn back time\n To the good old days\n When our momma sang us to sleep\n But now we''re stressed out\n Used to play pretend\n Give each other different names\n We would build a rocket ship and then we''d fly it far away\n Used to dream of outer space\n But now they''re laughing at our face singing\n "Wake up, you need to make money", yeah\n Used to play pretend\n Give each other different names\n We would build a rocket ship\n And then we''d fly it far away\n Used to dream of outer space\n But now they''re laughing at our face singing\n "Wake up, you need to make money", yeah\n  Wish we could turn back time\n To the good old days\n When our momma sang us to sleep\n But now we''re stressed\n Wish we could turn back time\n To the good old days\n When our momma sang us to sleep\n But now we''re stressed out\n We used to play pretend, used to play pretend, money\n We used to play pretend, wake up you need the money\n Used to play pretend, used to play pretend, money\n We used to play pretend, wake up you need the money\n Used to play pretend\n Give each other different names\n We would build a rocket ship\n And then we''d fly it far away\n Used to dream of outer space\n But now they''re laughing at our face saying\n "Wake up, you need to make money", yeah', '3:22', 'https://upload.wikimedia.org/wikipedia/ru/9/98/Twenty_one_pilots_stressed_out_cover.jpg', 2014, 'https://muzon-music.com/public/vk.play.php?id=371745434_456251312&vk_hash=612_e371d8acd8b17d814a&hash=06cb46146eb9f5a14c29706a25ea8bbf&a=Twenty%20One%20Pilots&t=Stressed%20Out&name=twenty-one-pilots_stressed-out', '[4]');

      SELECT "Insert_Track_Info" ('Blurryface', 'Twenty One Pilots', 'Alternative hip hop', 'Polarize', 'Help me polarize, help me polarize\n Help me down\n Those stairs is where I''ll be hiding all my problems\n Help me polarize, help me polarize\n Help me out\n My friends and I, we''ve got a lot of problems\n You know where I''m coming\n From though I am running\n To you, all I feel is deny, deny, denial\n I wanted to be a better brother, better son\n Wanted to be a better adversary to the evil I have done\n I have none to show to the one I love\n But deny, deny, denial\n Help me polarize, help me polarize\n Help me down\n Those stairs is where I''ll be hiding all my problems\n Help me polarize, help me polarize\n Help me out\n My friends and I, we''ve got a lot of problems\n Polarize is taking your disguises\n Separating them, splitting them up from wrong and right\n It''s deciding where to die and deciding where to fight\n Deny, deny, denial\n I wanted to be a better brother, better son\n Wanted to be a better adversary to the evil I have done\n I have none to show to the one I love\n But deny, deny, denial\n Help me polarize, help me polarize\n Help me down\n Those stairs is where I''ll be hiding all my problems\n Help me polarize, help me polarize\n Help me out\n My friends and I, we''ve got a lot of problems\n We have problems\n We have problems\n Domingo en fuego, I think I lost my halo\n I don''t know where you are\n You''ll have to come and find me, find me\n Domingo en fuego, I think I lost my halo\n I don''t know where you are\n You''ll have to come and find me, find me\n We have problems\n We have problems\n Help me polarize, help me polarize\n Help me out\n My friends and I have problems\n Help me polarize, help me polarize\n Help me out\n My friends and I have problems\n Help me polarize, help me polarize\n Help me out\n My friends and I have problems\n Help me polarize, help me polarize\n Help me out\n My friends and I have problems\n We have problems\n We have problems\n I wanted to be a better brother, better son\n I wanted to be a better brother, better son\n I wanted to be a better brother, better son', '3:46', 'https://pm1.narvii.com/6143/36298c8f0396cb5943731145d9b55d4398e995dc_hq.jpg', 2015, 'https://2mz.me/api/track/fuKouohK', '[4]');

      SELECT "Insert_Track_Info" ('Trench', 'Twenty One Pilots', 'Alternative hip hop', 'Chlorine', 'So where are you? It''s been a little while\n Sippin'' on straight chlorine, let the vibes slide over me\n This beat is a chemical, beat is a chemical\n When I leave don''t save my seat, I''ll be back when it''s all complete\n The moment is medical, moment is medical\n Sippin'' on straight chlorine\n Lovin'' what I''m tastin''\n Venom on my tongue\n Dependant at times\n Poisonous vibration\n Help my body run\n I''m runnin'' for my li-i-i-i-i-i-fe\n Runnin'' for my li-i-i-i-i-i-fe\n Sippin'' on straight chlorine, let the vibes slide over me\n This beat is a chemical, beat is a chemical\n When I leave don''t save my seat, I''ll be back when it''s all complete\n The moment is medical, moment is medical\n Sippin'' on straight chlorine\n Fall out of formation\n I plan my escape from walls they confined\n Rebel red carnation\n Grows while I decay\n I''m runnin'' for my li-i-i-i-i-i-fe\n Runnin'' for my li-i-i-i-i-i-fe\n Yeah, I''m runnin'' for my li-i-i-i-i-i-fe\n Runnin'' for my li-i-i-i-i-i-fe\n Had you in my coat pocket, where I kept my rebel red\n I felt I was invincible, you wrapped around my head\n Now different lives I lead, my body lives on lead\n The last two lines may read incorrect until said\n The lead is terrible in flavor\n But now you double as a papermaker\n I despise you sometimes\n I love to hate the fight and you in my life is like\n Sippin'' on straight chlorine, let the vibes slide over me\n This beat is a chemical, beat is a chemical\n When I leave don''t save my seat, I''ll be back when it''s all complete\n The moment is medical, moment is medical\n Sippin'' on straight chlorine\n Let the vibe, let the vibe\n Let the vibe, let the vibe\n Beat is a chemical, yeah\n Let the vibe, let the vibe\n Let the vibe, let the vibe\n Moment is medical, yeah\n Sippin'' on straight chlorine\n Let the vibe, let the vibe\n Let the vibe, let the vibe\n Beat is a chemical, yeah\n Let the vibe, let the vibe\n Let the vibe, let the vibe\n Moment is medical, yeah\n I''m so sorry, I forgot you\n Let me catch you up to speed\n I''ve been tested like the ends of\n A weathered flag that''s by the sea\n Can you build my house with pieces?\n I''m just a chemical\n Can you build my house with pieces?\n I''m just a chemical\n Can you build my house with pieces?\n I''m just a chemical\n Can you build my house with pieces?\n I''m just a chemical', '5:25', 'https://www.discogs.com/Twenty-One-Pilots-Chlorine-Alt-Mix/release/13189226/image/SW1hZ2U6Mzg1MzQwMzI=', 2018, 'https://mp3xi.net/mp3/YzM2NGQyMGNmZjYyYjMyNGIwZGJiN2Y3MDE4ZWFmNWZ8bG9hZA.mp3', '[4]');

      SELECT "Insert_Playlist" ('Imagine', 1, '[1, 2]');

      SELECT "Insert_Playlist" ('My playlist', 1, '[1, 3, 4, 7]');

      SELECT "Insert_Playlist" ('Favorites', 2, '[1, 3, 7]');

      SELECT "Insert_Playlist" ('TOP', 2, '[5, 7]');

      SELECT "Insert_Playlist" ('Music to relax', 3, '[2, 3, 6]');

      SELECT "Insert_Playlist" ('Best tracks', 3, '[1, 2, 5, 6, 7]');

      SELECT "Insert_Playlist" ('Fav tracks', 4, '[2, 3, 5]');

      SELECT "Insert_Playlist" ('playlist', 4, '[1, 3, 4, 6]');

      SELECT "Insert_Playlist" ('Energetic', 5, '[2, 4, 6]');

      SELECT "Insert_Playlist" ('Rock', 5, '[3, 4]');
  `);
  } catch (err) {
    // console.error('Cannot plant seeds');
  }
  console.log('Seeds planted');
}

module.exports = plantSeeds;
