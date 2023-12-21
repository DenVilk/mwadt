create database zoo;

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    googleid VARCHAR(255) DEFAULT 'null',
    role VARCHAR(255) DEFAULT 'USER'
);

CREATE TABLE country (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    country VARCHAR(255)
);

CREATE TABLE class (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE kind (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    classId INTEGER REFERENCES class(id)
);

CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    age INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    arrival_date DATE NOT NULL,
    kindId INTEGER REFERENCES kind(id),
    countryId INTEGER REFERENCES country(id)
);
