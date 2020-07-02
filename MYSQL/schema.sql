DROP DATABASE IF EXISTS airbnb;
CREATE DATABASE airbnb;
use airbnb;


CREATE TABLE suggestions(
  id INT(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  listingId INT(20) NOT NULL,
  roomtype VARCHAR(255),
  numbOfBedrooms INT(10),
  placeName VARCHAR(255),
  price DECIMAL(10,2),
  pictureURL VARCHAR(255)
);

-- CREATE TABLE roomtype(
--   id INT(20) PRIMARY KEY NOT NULL,
--   type VARCHAR(255)
-- );

CREATE TABLE reviews (
  id INT(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  listingId INT(20) NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  avatarURL VARCHAR(255),
  comments TEXT,
  createdAt DATETIME,
  cleanliness INT(20),
  accuracy INT(20),
  communication INT(20),
  location INT(20),
  checkIn INT(20),
  value INT(20),
  average DECIMAL(10,2)
);