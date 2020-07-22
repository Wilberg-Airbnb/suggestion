DROP DATABASE IF EXISTS airbnb2;
CREATE DATABASE airbnb2;
use airbnb2;


CREATE TABLE suggestions(
  id INT(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  listingId INT(20) NOT NULL,
  superhost BOOLEAN,
  roomtype VARCHAR(255),
  numbOfBedrooms INT(10),
  placeName VARCHAR(255),
  price DECIMAL(10,2),
  pictureURL VARCHAR(255)
);
