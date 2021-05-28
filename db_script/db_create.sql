/* Still needs work! */
CREATE DATABASE newssitedb;
GO
USE newssitedb;
GO
CREATE TABLE newssitedb.dbo.Users (
    id int IDENTITY(1,1) PRIMARY KEY,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    avatar varchar(255),
    role int
);
GO
CREATE TABLE newssitedb.dbo.News (
    id int IDENTITY(1,1) PRIMARY KEY,
    title varchar(255) NOT NULL,
    author int,
    releasedate datetime
);
GO 
CREATE TABLE newssitedb.dbo.Forms (
    id int IDENTITY(1,1) PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    releasedate datetime
);
