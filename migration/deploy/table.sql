-- Deploy asela:table to pg

BEGIN;

CREATE TABLE "volunteer" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lastname VARCHAR(50) NOT NULL,
    firstname VARCHAR(25) NOT NULL,
    number VARCHAR(10) NOT NULL UNIQUE,
    mail VARCHAR(70) NOT NULL UNIQUE,
    password VARCHAR(70) NOT NULL
);

CREATE TABLE "host_family" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lastname VARCHAR (50) NOT NULL,
    firstname VARCHAR (25) NOT NULL,
    number_phone VARCHAR(10) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    city TEXT NOT NULL,
    adress TEXT NOT NULL,
    email VARCHAR (70) NOT NULL,
    pet_composition TEXT NOT NULL,
    pet_accepted TEXT NOT NULL
);

CREATE TABLE "adoptant" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lastname VARCHAR (50) NOT NULL,
    firstname VARCHAR (25) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    number_phone VARCHAR(10) NOT NULL,
    city TEXT NOT NULL,
    email VARCHAR (70) NOT NULL,
    adress TEXT NOT NULL
);

CREATE TABLE "pet" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type VARCHAR(10) NOT NULL,
    name VARCHAR(50),
    age TEXT,
    amity TEXT DEFAULT 'inconnu',
    sexe TEXT,
    breed TEXT,
    ide TEXT,
    sterilised BOOLEAN DEFAULT false,
    date_vaccine DATE,
    description TEXT,
    weight TEXT,
    adopt BOOLEAN DEFAULT false,
    date_adopting DATE,
    adoptant_id int DEFAULT NULL REFERENCES "adoptant"(id),
    host_family_id int DEFAULT NULL REFERENCES "host_family"(id)
);

/*CREATE TABLE "supported" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type VARCHAR (10) NOT NULL,
    date DATE NOT NULL,
   location TEXT NOT NULL,
    assignor VARCHAR (50) NOT NULL,
    species TEXT NOT NULL,
    sexe TEXT,
    ide TEXT UNIQUE,
    name VARCHAR (50),
    description TEXT NOT NULL,
    old INT NOT NULL
);*/

CREATE TABLE "veterinary" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR (50) NOT NULL,
    number_phone VARCHAR(10) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    city TEXT NOT NULL,
    email VARCHAR (70) NOT NULL,
    adress TEXT NOT NULL

);

CREATE TABLE "event" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    "location" TEXT NOT NULL,
    date_event DATE NOT NULL,
    content TEXT NOT NULL,
    picture TEXT NOT NULL
    
);

CREATE TABLE "condition_adopt"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "description" TEXT NOT NULL
);

CREATE TABLE "price_adopt"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type_pet TEXT NOT NULL,
    sexe_pet TEXT NOT NULL,
    price INT NOT NULL,
    caution INT
);

CREATE TABLE "picture_pet"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR (50) NOT NULL,
    pet_id INT NOT NULL REFERENCES "pet"(id)
);

CREATE TABLE "picture_event"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    event_id INT NOT NULL REFERENCES "event"(id)
);

CREATE TABLE "commentaires_pet"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- pet has adopted
    pet_id int NOT NULL REFERENCES "pet"(id),
    -- commentaire 
    commentaire TEXT NOT NULL
);

CREATE TABLE "commentaire_host_familly" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     -- host familly
    host_family_id int NOT NULL REFERENCES "host_family"(id),
    -- commentaire
    commentaire TEXT NOT NULL 
);

CREATE TABLE "commentaire_adoptant" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     -- host familly
    adoptant_id int NOT NULL REFERENCES "adoptant"(id),
    -- commentaire
    commentaire TEXT NOT NULL
);

/*CREATE TABLE "pet_has_supported" (
    -- pet has adopted
    pet_id int NOT NULL REFERENCES "pet"(id),
    -- familly adopt
    supported_id int NOT NULL REFERENCES "supported"(id)
);
*/

COMMIT;
