/* Still needs work! */
CREATE DATABASE newssitedb;
GO
USE newssitedb;
GO
CREATE TABLE IF NOT EXISTS Users (
    id serial NOT NULL PRIMARY KEY, 
    username varchar(255) NOT NULL, 
    email varchar(255) NOT NULL, 
    avatar varchar(255), 
    role int
);
GO
CREATE TABLE IF NOT EXISTS News (
    id serial NOT NULL PRIMARY KEY, 
    title varchar(255) NOT NULL, 
    author int,
    content text, 
    release_date TIMESTAMP DEFAULT Now()
);
GO 
CREATE TABLE IF NOT EXISTS Forms (
    id serial NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255),
    content text,
    release_date TIMESTAMP DEFAULT Now()
);
