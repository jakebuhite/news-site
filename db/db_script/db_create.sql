/* Still needs work! */
CREATE DATABASE newssitedb;
GO
USE newssitedb;
GO
CREATE TABLE Users (
    id serial NOT NULL PRIMARY KEY, 
    username varchar(255) NOT NULL, 
    email varchar(255) NOT NULL, 
    avatar varchar(255), 
    role int
);
GO
CREATE TABLE News (
    id serial NOT NULL PRIMARY KEY, 
    title varchar(255) NOT NULL, 
    author int, 
    release_date timestamp
);
GO 
CREATE TABLE Forms (
    id serial NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255),
    release_date timestamp
);
