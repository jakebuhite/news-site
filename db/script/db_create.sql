CREATE TABLE Users (
    id serial NOT NULL PRIMARY KEY, 
    username varchar(255) NOT NULL, 
    email varchar(255), 
    avatar varchar(255) DEFAULT 'avatar.png', 
    role int DEFAULT 1
);
GO
CREATE TABLE News (
    id serial NOT NULL PRIMARY KEY, 
    title varchar(255) NOT NULL, 
    author int,
    content text, 
    release_date TIMESTAMP DEFAULT NOW()
);
GO 
CREATE TABLE Forms (
    id serial NOT NULL PRIMARY KEY,
    name varchar(255),
    email varchar(255) NOT NULL,
    content text,
    release_date TIMESTAMP DEFAULT NOW()
);