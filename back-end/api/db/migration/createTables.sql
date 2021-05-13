CREATE TABLE IF NOT EXISTS "artist" (
    "artist_id" SERIAL PRIMARY KEY NOT NULL,
    "artist_name" varchar(70) NOT NULL
);

CREATE TABLE IF NOT EXISTS "track_category" (
    "category_id" SERIAL PRIMARY KEY NOT NULL,
    "category_name" varchar(70) NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
    "user_id" SERIAL PRIMARY KEY NOT NULL,
    "first_name" varchar(60) NOT NULL,
    "last_name" varchar(70) NOT NULL,
    "username" varchar(60) NOT NULL,
    "email" varchar(100) NOT NULL,
    "password" varchar(100) NOT NULL,
    "role" varchar(10) NOT NULL default 'base'
);

CREATE TABLE IF NOT EXISTS "room" (
    "room_id" SERIAL PRIMARY KEY NOT NULL,
    "admin_id" bigint NOT NULL,
    "room_name" varchar(255) NOT NULL,
  CONSTRAINT "room_fk0" FOREIGN KEY ("admin_id") REFERENCES "user"("user_id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "album" (
    "album_id" SERIAL PRIMARY KEY  NOT NULL,
    "album_name" varchar(70) NOT NULL,
    "artist_id" bigint NOT NULL,
    "cover" TEXT,
    "artist_list" TEXT NOT NULL,
  CONSTRAINT "album_fk0" FOREIGN KEY ("artist_id") REFERENCES "artist"("artist_id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "playlist" (
    "playlist_id" SERIAL PRIMARY KEY NOT NULL,
    "playlist_title" varchar(80) NOT NULL,
    "user_id" bigint NOT NULL,
    "last_update" TIMESTAMP NOT NULL,
    "track_list" TEXT NOT NULL,
  CONSTRAINT "playlist_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "track_info" (
    "track_id" SERIAL PRIMARY KEY NOT NULL,
    "album_id" bigint,
    "artist_id" bigint NOT NULL,
    "category_id" bigint,
    "track_name" varchar(100) NOT NULL,
    "lyrics" TEXT,
    "duration" varchar(40) NOT NULL,
    "cover" TEXT,
    "release_year" int NOT NULL,
    "time_added" TIMESTAMP,
    "track_url" TEXT NOT NULL,
    "artist_list" TEXT NOT NULL,
  CONSTRAINT "track_Info_fk0" FOREIGN KEY ("album_id") REFERENCES "album"("album_id") ON DELETE CASCADE,
  CONSTRAINT "track_Info_fk1" FOREIGN KEY ("artist_id") REFERENCES "artist"("artist_id") ON DELETE CASCADE,
  CONSTRAINT "track_Info_fk2" FOREIGN KEY ("category_id") REFERENCES "track_category"("category_id") ON DELETE CASCADE
);
