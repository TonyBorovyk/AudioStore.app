CREATE DATABASE "AudioStoreDB";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Track_Info" (
  "Track_ID" uuid DEFAULT uuid_generate_v1 (),
  "Album_ID" uuid,
  "Artist_ID" uuid NOT NULL,
  "Category_ID" uuid,
  "Track_name" varchar(100) NOT NULL,
  "Lyrics" varchar(255),
  "Duration" varchar(40) NOT NULL,
  "Cover" TEXT,
  "Release_year" int NOT NULL,
  "Time_added" TIME,
  "Track_URL" TEXT NOT NULL,
  "Artist_List" TEXT NOT NULL,
  CONSTRAINT "Track_Info_pk" PRIMARY KEY ("Track_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Track_Category" (
  "Category_ID" uuid DEFAULT uuid_generate_v1 (),
  "Category_Name" varchar(70) NOT NULL,
  CONSTRAINT "Track_Category_pk" PRIMARY KEY ("Category_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Artist" (
  "Artist_ID" uuid DEFAULT uuid_generate_v1 (),
  "Artist_Name" varchar(70) NOT NULL,
  CONSTRAINT "Artist_pk" PRIMARY KEY ("Artist_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "User" (
  "User_ID" uuid DEFAULT uuid_generate_v1 (),
  "First_name" varchar(60) NOT NULL,
  "Last_name" varchar(70) NOT NULL,
  "UserName" varchar(60) NOT NULL,
  "Email" varchar(100) NOT NULL,
  "Password" varchar(50) NOT NULL,
  "Role" varchar(10) NOT NULL default 'base',
  CONSTRAINT "User_pk" PRIMARY KEY ("User_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Playlist" (
  "Playlist_ID" uuid DEFAULT uuid_generate_v1 (),
  "Playlist_title" varchar(80) NOT NULL,
  "User_ID" uuid NOT NULL,
  "Last_update" TIME NOT NULL,
  "Track_List" varchar(255) NOT NULL,
  CONSTRAINT "Playlist_pk" PRIMARY KEY ("Playlist_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Room" (
  "Room_ID" uuid DEFAULT uuid_generate_v1 (),
  "Admin_ID" uuid NOT NULL,
  "Room_Name" varchar(255) NOT NULL,
  CONSTRAINT "Room_pk" PRIMARY KEY ("Room_ID","Admin_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Albums" (
  "Album_ID" uuid DEFAULT uuid_generate_v1 (),
  "Album_Name" varchar(70) NOT NULL,
  "Artist_ID" uuid NOT NULL,
  "Cover" TEXT,
  "Artist_List" varchar(255) NOT NULL,
  CONSTRAINT "Albums_pk" PRIMARY KEY ("Album_ID")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Track_Info" ADD CONSTRAINT "Track_Info_fk0" FOREIGN KEY ("Album_ID") REFERENCES "Albums"("Album_ID");
ALTER TABLE "Track_Info" ADD CONSTRAINT "Track_Info_fk1" FOREIGN KEY ("Artist_ID") REFERENCES "Artist"("Artist_ID");
ALTER TABLE "Track_Info" ADD CONSTRAINT "Track_Info_fk2" FOREIGN KEY ("Category_ID") REFERENCES "Track_Category"("Category_ID");



ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_fk0" FOREIGN KEY ("User_ID") REFERENCES "User"("User_ID");

ALTER TABLE "Room" ADD CONSTRAINT "Room_fk0" FOREIGN KEY ("Admin_ID") REFERENCES "User"("User_ID");

ALTER TABLE "Albums" ADD CONSTRAINT "Albums_fk0" FOREIGN KEY ("Artist_ID") REFERENCES "Artist"("Artist_ID");


CREATE OR REPLACE FUNCTION "Insert_Artist"(
  "Artist_Name_new" varchar(70)
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO "Artist" ("Artist_Name")
  VALUES ("Artist_Name_new");
END
$$
  LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION "Insert_Track_Category"(
  "Category_Name_new" varchar(70)
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO "Track_Catagory" ("Category_Name")
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
    INSERT INTO "User" ("First_name", "Last_name", "UserName", "Email", "Password", "Role")
  VALUES ("First_name_new", "Last_name_new", "UserName_new", "Email_new", "Password_new", "Role_new");
END
$$
  LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION "Insert_Room"(
  	"Admin_ID_new" uuid,
    "Room_Name_new" varchar(255)
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO "Room" ("Admin_ID", "Room_Name")
  VALUES ("Admin_ID_new", "Room_Name_new");
END
$$
  LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION "Insert_Albums"(
    "Album_Name_new" varchar(70),
  	"Artist_Name_new" varchar(70),
    "Cover_new" TEXT,
    "Artist_List_new" varchar(255)
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO "Albums" ("Album_Name", "Artist_ID", "Cover", "Artist_List")
  VALUES ("Album_Name_new", (SELECT "Artist_ID" FROM "Artist" WHERE "Artist_Name" = "Artist_Name_new"), "Cover_new", "Artist_List_new");
END
$$
  LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION "Insert_Playlist"(
    "Playlist_title_new" varchar(80),
  	"User_ID_new" uuid,
    "Track_List_new" varchar(255)
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO "Playlist" ("Playlist_title", "User_ID", "Last_update", "Track_List")
  VALUES ("Playlist_title_new", "User_ID_new", (SELECT now ()), "Track_List_new");
END
$$
  LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION "Insert_Track_Info"(
  	"Album_Name_new" varchar(70),
  	"Artist_Name_new" varchar(70),
  	"Category_Name_new" varchar(70),
  	"Track_name_new" varchar(100),
  	"Lyrics_new" varchar(255),
  	"Duration_new" varchar(40),
  	"Cover_new" TEXT,
  	"Release_year_new" int,
  	"Track_URL_new" TEXT,
  	"Artist_List_new" TEXT
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO "Track_Info" ("Album_ID", "Artist_ID", "Category_ID", "Track_name", "Lyrics", "Duration", "Cover", "Release_year", "Time_added", "Track_URL", "Artist_List")
  VALUES ((SELECT "Album_ID" FROM "Albums" WHERE "Album_Name" = "Album_Name_new"), (SELECT "Artist_ID" FROM "Artist" WHERE "Artist_Name" = "Artist_Name_new"), (SELECT "Category_ID" FROM "Category" WHERE "Category_Name" = "Category_Name_new"), "Track_name_new", "Lyrics_new", "Duration_new", "Cover_new", "Release_year_new", (SELECT now()), "Track_URL_new", "Artist_List_new");
END
$$
  LANGUAGE 'plpgsql';