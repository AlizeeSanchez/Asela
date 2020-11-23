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
    pet_accepted TEXT NOT NULL,
    disponibility BOOLEAN DEFAULT true,
    pet_asela TEXT
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
    date_supported DATE, -- Date de prise en charge
    type VARCHAR(10) NOT NULL, -- type d'animal
    name VARCHAR(50), -- Nom de l'animal
    age TEXT, -- age ou date de naissance de l'animal
    amity TEXT DEFAULT 'inconnu', -- ententes de l'animal
    sexe TEXT, -- sexe de l'animal
    breed TEXT, --Race de l'animal
    color TEXT, -- Robe de l'animal
    ide TEXT, -- identification de l'animal
    sterilised BOOLEAN DEFAULT false, -- si l'animal est sterilisé
    date_vaccine DATE, --date du dernier vaccin
    description TEXT, --description de l'animal
    weight TEXT, --taille de l'animal
    host_family_id int DEFAULT NULL REFERENCES "host_family"(id), --Id de la famille d'accueil
    adopt BOOLEAN DEFAULT false, -- Si l'animal est adopté
    date_adopting DATE DEFAULT NULL , --Date de l'adoption
    adoptant_id int DEFAULT NULL REFERENCES "adoptant"(id), -- id de l'adoptant
    last_name_pet VARCHAR(50), -- Nom de l'animal donné par l'adoptant (si changement)
    facebook_publish BOOLEAN DEFAULT false,--Publié sur facebook
    seconde_chance_publish BOOLEAN DEFAULT false,--Publié sur seconde chance
    reserve BOOLEAN DEFAULT false,--Reservé
    deceased BOOLEAN DEFAULT false --Si l'animal est décédé
);

CREATE TABLE "veterinary" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR (50) NOT NULL, -- Nom de la clinique
    number_phone VARCHAR(10) NOT NULL, -- Numero de telephone
    postal_code VARCHAR(5) NOT NULL, -- Code postal
    city TEXT NOT NULL, -- Ville du veterinaire    
    adress TEXT NOT NULL, -- adresse du veterinaire
    email VARCHAR (70), -- email du veterinaire
    price_ide_eval TEXT, -- couleur permetant l'evaluation du prix associatif (rouge=pas bon - vert =bon)
    price_vaccine_eval TEXT, -- couleur permetant l'evaluation du prix associatif (rouge=pas bon - vert =bon)
    price_cat_eval TEXT, -- couleur permetant l'evaluation du prix associatif (rouge=pas bon - vert =bon)
    price_litledog_eval TEXT, -- couleur permetant l'evaluation du prix associatif (rouge=pas bon - vert =bon)
    price_bigdog_eval TEXT -- couleur permetant l'evaluation du prix associatif (rouge=pas bon - vert =bon)
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
    caution INT,
    race BOOLEAN DEFAULT false, -- Si on demande un supplement pour animal de race
    race2 INT -- Si true le prix de ce supplement
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

CREATE TABLE "commentaire_pet"( -- Commentaire au sujet d'un animal
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pet_id int NOT NULL REFERENCES "pet"(id),
    commentaire TEXT NOT NULL
);

CREATE TABLE "commentaire_host_familly" (-- Commentaire au sujet d'une famille d'accueil
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    host_family_id int NOT NULL REFERENCES "host_family"(id),
    commentaire TEXT NOT NULL 
);

CREATE TABLE "commentaire_adoptant" ( --Commentaire au sujet d'un adoptant
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    adoptant_id int NOT NULL REFERENCES "adoptant"(id),
    commentaire TEXT NOT NULL
);

CREATE TABLE "price_veterinary" (-- Prix et arrangement avec veterinaire
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    veterinary_id int NOT NULL REFERENCES "veterinary"(id),
    price TEXT NOT NULL
);

CREATE TABLE "questionnaire_FH" ( -- Questionnaire familly host

);

CREATE TABLE "questionnaire_adopt" ( -- Questionnaire adoptant
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date DATE, -- Date d'entré du questionnaire
    email VARCHAR (70) NOT NULL, -- Email
    type_pet VARCHAR(10) NOT NULL, -- type d'animal 
    name_pet VARCHAR (70), -- Nom de l'animal
    lastname_firstname VARCHAR (70) NOT NULL, -- Nom et prenom de la personne
    date_birth VARCHAR (70) NOT NULL, -- 
    occupation VARCHAR (70)NOT NULL,
    lastname_firstname_spouse VARCHAR (70), -- Nom et prenom du conjoin
    date_birth_spouse VARCHAR (70), 
    occupation_spouse VARCHAR (70),
    number_phone VARCHAR(10) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    city TEXT NOT NULL,
    adress TEXT NOT NULL,
    shifting BOOLEAN NOT NULL, -- Comptez vous vous deplacer pour rencontrer l'animal oui/non
    type_residence TEXT NOT NULL, -- Choix multiple : maison, appartement, avec jardin, avec terrasse, caravane, terrain, bateau
    height_fence TEXT, -- Si avec jardin est coché : Hauteur de votre cloture
    proprietor TEXT NOT NULL, -- Choix : proprietaire / locataire
    number_adult TEXT NOT NULL, -- Choix : Nombre d'adulte vivant au domicile (choix 1,2,3,4+)
    number_children TEXT NOT NULL, -- Choix : Nombre d'enfant vivant au domicile (choix 0,1,2,3,4+)
    age_children TEXT , -- Si 1 ou plus Age des enfants
    allergy TEXT NOT NULL, -- Si un occupant de la maison devient allergique à votre animal que ferez-vous ?
    adopt_assos BOOLEAN NOT NULL, -- Avez-vous déjà adopté un animal dans une association, refuge ou SPA (Oui / non)
    adopt_assos2 TEXT, -- Si oui où?
    trust_assos BOOLEAN NOT NULL,-- Avez-vous déjà laissé un animal dans une association, refuge, SPA, autre ? (Oui / non)
    trust_assos2 TEXT, -- Si oui dans quelles conditions?
    pet_familly BOOLEAN NOT NULL, -- Avez vous un ou des animaux ? (Oui / non)
    pet_familly2 TEXT, -- Si oui : Dresser une liste des animaux présents dans le foyer en précisant le  Type/Race Âge Sexe Stérilisé/Castré vacciné?
    pet_familly_deceased TEXT, -- Dresser une liste des animaux que vous avez eu au cours de votre vie et qui sont décédé, quel sont les causes du décés?
    veterinary BOOLEAN NOT NULL, -- Avez vous un vétérinaire ? (Oui / non)
    veterinary2 TEXT, -- Si oui quel est le nom de la clinique veterinaire ?
    veterinary3 BOOLEAN, -- Si non Ferez vous appel a un vétérinaire pour suivre l'animal  (Oui / non)
    disponibility BOOLEAN NOT NULL, -- Est-ce qu’il y a quelqu’un à votre domicile la journée ? (Oui / non)
    disponibility2 TEXT, -- Si non, pendant combien d’heures êtes vous absent(e)?
    holiday TEXT NOT NULL, -- Lors d’une absence (vacances, longue journée de travail, travail de nuit), qui prendra soin de votre animal ? (Choix multiple)
    holiday2 TEXT, -- Si autre, veuillez préciser :
    awareness BOOLEAN NOT NULL, --Un chien ou un chat peut vivre 10 à 20 ans. Êtes-vous prêt à vous engager à vivre avec votre animal pour sa vie entière ?
    education TEXT NOT NULL, --Comment éduquerez- vous votre animal pour mettre fin à d’éventuels comportements destructifs?
    informed BOOLEAN NOT NULL, --L intégralité de votre foyer est-il averti et d 'accord avec cette adoption ? (Oui / non)
    adopt TEXT NOT NULL, -- Pour qui adoptez vous cet animal ?
    adopt2 TEXT NOT NULL,-- Pourquoi voulez-vous adopter un chat/chien ?
    tomove TEXT NOT NULL, --Si vous décidez de déménager, que ferez-vous de votre animal ? 
    sterilization TEXT NOT NULL,--Quelle est votre opinion sur la stérilisation et la castration ?
    forbearance BOOLEAN NOT NULL, --Votre animal aura besoin de temps pour s'adapter à votre maison. Serez vous patient et compréhensif ? (Oui / non)
    cleanliness TEXT NOT NULL, -- Si l’animal que vous adoptez n’est pas propre ou a besoin d’éducation, que ferez-vous ?
    amity TEXT, --Si a des animaux : Que ferez-vous si votre animal ne s’entend pas avec celui que vous avez déjà ?
    garden TEXT, --Si vous avez du terrain, comment votre animal y aura-t-il accès?
    bed TEXT NOT NULL, --Ou couchera votre animal?
    waiting TEXT NOT NULL, --Qu'attendez vous de la part de votre animal?
    motivation TEXT NOT NULL, --Qu’est-ce qui vous motive à adopter un animal via une Association ? 
    ----------------------------CHAT---------------------
    declawing BOOLEAN, -- Planifiez-vous faire dégriffer votre chat ?
    -----------------Question CHIEN---------------------
    race_pet VARCHAR (70), -- Race de l'animal
    petstatus TEXT, -- Recherchez vous un animal : De compagnie, Pour vous même, Pour le travail,Pour garder la maison, Pour garder le terrain
    responsability TEXT, -- Qui, parmi les occupants de votre maison, aura les responsabilités suivantes : Education et balades.
    education2 TEXT, --Quelle méthode utiliserez vous l’éduquer et pour qu’il obéisse? Donnez des exemples.
    cage BOOLEAN, -- Avez-vous déjà utilisé une cage pour mettre fin à un comportement destructeur?
    cage2 BOOLEAN, -- Si oui , L'utiliserez vous encore ?
    absent TEXT, --Quand vous serez absent, où restera votre animal ? ( Choix )
    present TEXT, -- Quand vous êtes présent, où restera votre animal ?
    activity TEXT, -- Quel type d’activités prévoyez-vous pour votre chien ? ( Choix multiple )
    activity2 TEXT, -- Précisez la durée de l’activité et son rythme balade en laisse et en liberté, accès jardin :
    educator BOOLEAN, --Avez-vous déjà fait appel à un/une éducateur canin ?
    educator2 TEXT, -- Si oui, précisez ses coordonnées
    educator3 BOOLEAN, -- Sinon pensez vous faire appel à un éducateur canin ?
    ---------complementary
    facebook_pseudo VARCHAR (70), -- pseudo facebook
    advertisement TEXT, -- Où avez-vous entendu parler de notre association ? ( Choix multiple )
    free VARCHAR (500), -- Si vous avez d'autre element dont vous souhaitez nous faire part c'est ici 
    --------------------RESERVE BENEVOLE-----------------------------
    date_sending DATE DEFAULT NOW() NOT NULL, -- Date d'envois du questionnaire
    status TEXT DEFAULT 'En attente' NOT NULL, -- Status du questionnaire (En attente, Refusé, Sans suite, Rencontre, Adopté)
    meet DATE, --  Si rencontre : Date de la rencontre
    refused_comment TEXT, -- si refusé : commentaire
    general_comment TEXT -- commentaire en tout genre
);

CREATE TABLE "blacklister" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lastname VARCHAR (50) NOT NULL,
    firstname VARCHAR (25) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    number_phone VARCHAR(10) NOT NULL,
    city TEXT NOT NULL,
    email VARCHAR (70) NOT NULL,
    adress TEXT NOT NULL,
    explication TEXT NOT NULL
);




COMMIT;
