-- Deploy asela:table to pg

BEGIN;

CREATE TABLE "volunteer" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    lastname VARCHAR(50) NOT NULL, -- Lastname to volunteer
    firstname VARCHAR(25) NOT NULL, -- Firstname to volunteer
    number VARCHAR(10) NOT NULL UNIQUE, -- Number Phone to volunteer
    mail VARCHAR(70) NOT NULL UNIQUE, -- Mail to volunteer
    password VARCHAR(70) NOT NULL, -- Password to volunteer
    adress TEXT NOT NULL, --adress to volunteer
    city TEXT NOT NULL, -- city to volunteer
    postal_code TEXT NOT NULL, --postal_code to volunteer
    admin BOOLEAN DEFAULT false -- if volunteer is ADMIN 
);

CREATE TABLE "host_family" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    -----------------------------question famille d'acceuil---------------------------------------
    lastname VARCHAR (50) NOT NULL, -- Lastname to  host_family
    firstname VARCHAR (25) NOT NULL, -- Firstname to host_family
    birthday TEXT, --Old to people host_family
    number_phone VARCHAR(10) NOT NULL, -- Number Phone to host_family
    facebook TEXT, -- Pseudo facebook to host_family
    postal_code VARCHAR(5) NOT NULL, -- Postal code to host_family
    city TEXT NOT NULL, -- city to host_family
    adress TEXT NOT NULL,-- adress to host_family
    type_home TEXT,-- type home to host_family
    area_home TEXT,-- area at home to host_family
    area_garden TEXT,-- area at garden to host_family
    pet_accepted_garden TEXT, -- pet accepted in garden to host_family
    fencing BOOLEAN, -- id gardin is close
    fencing_height TEXT, -- height to fencing in garden
    job TEXT, --job to host family
    email VARCHAR (70), -- Mail to host_family
    number_adult TEXT, -- Choix : Nombre d'adulte vivant au domicile (choix 1,2,3,4+)
    number_children TEXT, -- Choix : Nombre d'enfant vivant au domicile (choix 0,1,2,3,4+)
    age_children TEXT , -- Age des enfants
    pet_composition TEXT,-- pet composition family to host_family
    pet_sterilised TEXT, --pet sterilised/castrated to host_family
    kitten_accepted BOOLEAN DEFAULT false,-- if kitten accepted to host_family
    cat_accepted BOOLEAN DEFAULT false,-- if cat accepted to host_family
    dog_big_accepted BOOLEAN DEFAULT false,-- if big dog accepted to host_family
    dog_middle_accepted BOOLEAN DEFAULT false,-- if middle dog accepted to host_family
    dog_little_accepted BOOLEAN DEFAULT false,-- if little dog accepted to host_family
    puppy_accepted BOOLEAN DEFAULT false,-- if puppy accepted to host_family
    family_accept_acceuil TEXT, -- if host_family accept to acceuil pet
    hour_absence_day TEXT, --how many hour poeple absence by day
    -----------------------------question cat acceuil----------------------------------------
    poeple_amity_cat BOOLEAN DEFAULT true, --cat comportement
    ----------------------------question chien------------------------------------------------
    dog_sexe_acceuil TEXT, -- sexe of dog acceuil to host_family
    poeple_educate TEXT, -- experience educate for dog to host_family
    dog_accept_problem TEXT, -- host_family accept dog problem
    dog_closed_room TEXT, -- room for dog if need
    dog_sleep TEXT, -- where is dog sleeping
    poeple_with_dog TEXT, -- where is dog when poeple will be present
    poeple_without_dog TEXT, --where is dog when poeple will be absent
    poeple_ask TEXT, -- precision to host_family
    poeple_drive_veterinary TEXT, -- if host_family drive dog to veterinary
    poeple_car TEXT, -- if host_family have a car
    poeple_counsciousness TEXT, --if host_family have counciousness to dog
    poeple_motivation TEXT, --what are the motivation to host_family
    poeple_warning TEXT, --important to signalate to host_family
    ---------------------------certificate---------------------------------------------------
    certificate_poeple BOOLEAN DEFAULT false, -- certificate to host_family
    approuved_poeple BOOLEAN DEFAULT false, -- read / approuved to host_family
    -------------------------------------------------------------------------------------------
    disponibility BOOLEAN DEFAULT true,-- If host_family is disponible 
    people_date_accueil TEXT,
    nolongercontact BOOLEAN DEFAULT false,-- If is old host_family indisponible
    pet_complet BOOLEAN DEFAULT false,-- if the familly host have pet asele at home
    pet_asela TEXT,-- name of pet asela 
    comment TEXT,-- comment to host familly
    black_list BOOLEAN DEFAULT false,-- if the host_family is black list
    new BOOLEAN DEFAULT true,-- if is a new host familly
    date_sending DATE DEFAULT NOW() NOT NULL -- Date d'envois du questionnaire

);

CREATE TABLE "questionnaire_adopt" ( -- Questionnaire adoptant
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    date DATE DEFAULT NOW(), -- Date d'entré du questionnaire
    email VARCHAR (70) NOT NULL, -- Email
    type_pet TEXT NOT NULL, -- type d'animal 
    name_pet VARCHAR (70), -- Nom de l'animal
    lastname VARCHAR (50) NOT NULL, -- Lastname to  host_family 
    firstname VARCHAR (25) NOT NULL, -- Firstname to host_family
    date_birth VARCHAR (70) NOT NULL, -- 
    occupation VARCHAR (70)NOT NULL,
    spouselastname TEXT, -- Nom et prenom du conjoint
    spousefirstname TEXT,
    date_birth_spouse VARCHAR (70), 
    occupation_spouse VARCHAR (70),
    number_phone VARCHAR(10) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    city TEXT NOT NULL,
    adress TEXT NOT NULL,
    shifting BOOLEAN NOT NULL, -- Comptez vous vous deplacer pour rencontrer l'animal oui/non
    type_residence TEXT NOT NULL, -- Choix multiple : maison, appartement, avec jardin, avec terrasse, caravane, terrain, bateau
    area_home TEXT,-- area at home to host_family
    area_garden TEXT,-- area at garden to host_family
    fencing TEXT, -- id gardin is close / Oui / Partiellement / Non
    height_fence TEXT, -- Si avec jardin est coché : Hauteur de votre cloture
    number_adult TEXT NOT NULL, -- Choix : Nombre d'adulte vivant au domicile (choix 1,2,3,4+)
    number_children TEXT NOT NULL, -- Choix : Nombre d'enfant vivant au domicile (choix 0,1,2,3,4+)
    age_children TEXT, -- Si 1 ou plus Age des enfants
    allergy TEXT NOT NULL, -- Si un occupant de la maison devient allergique à votre animal que ferez-vous ?
    adopt_assos BOOLEAN NOT NULL, -- Avez-vous déjà adopté un animal dans une association, refuge ou SPA (Oui / non)
    adopt_assos2 TEXT, -- Si oui où?
    abandoned_assos BOOLEAN NOT NULL,-- Avez-vous déjà laissé un animal dans une association, refuge, SPA, autre ? (Oui / non)
    abandoned_assos2 TEXT, -- Si oui dans quelles conditions?
    pet_familly BOOLEAN NOT NULL, -- Avez vous un ou des animaux ? (Oui / non)
    pet_familly2 TEXT, -- Si oui : Dresser une liste des animaux présents dans le foyer en précisant le  Type/Race Âge Sexe Stérilisé/Castré vacciné?
    pet_familly_deceased TEXT, -- Dresser une liste des animaux que vous avez eu au cours de votre vie et qui sont décédé, quel sont les causes du décés?                                                                -- A ENLEVER
    disponibility BOOLEAN NOT NULL, -- Est-ce qu’il y a quelqu’un à votre domicile la journée ? (Oui / non)
    disponibility2 TEXT, -- Si non, pendant combien d’heures êtes vous absent(e)? 
    holiday TEXT NOT NULL, -- Lors d’une absence (vacances, longue journée de travail, travail de nuit), qui prendra soin de votre animal ? (Choix multiple)
    awareness BOOLEAN NOT NULL, --Un chien ou un chat peut vivre 10 à 20 ans. Êtes-vous prêt à vous engager à vivre avec votre animal pour sa vie entière ?
    education TEXT NOT NULL, --Comment éduquerez- vous votre animal pour mettre fin à d’éventuels comportements destructifs?
    informed BOOLEAN NOT NULL, --L intégralité de votre foyer est-il averti et d 'accord avec cette adoption ? (Oui / non)
    adopt TEXT NOT NULL, -- Pourquoi voulez-vous adopter un chat/chien ?                                                               
    tomove TEXT NOT NULL, --Si vous décidez de déménager, que ferez-vous de votre animal ? 
    sterilization TEXT NOT NULL,--Quelle est votre opinion sur la stérilisation et la castration ?
    forbearance BOOLEAN NOT NULL, --Votre animal aura besoin de temps pour s'adapter à votre maison. Serez vous patient et compréhensif ? (Oui / non)
    cleanliness TEXT NOT NULL, -- Si l’animal que vous adoptez n’est pas propre ou a besoin d’éducation, que ferez-vous ?
    amity TEXT, --Si a des animaux : Que ferez-vous si votre animal ne s’entend pas avec celui que vous avez déjà ?
    garden TEXT, --Si vous avez un exterieur comment votre animal y aura acces                         
    bed TEXT NOT NULL, --Ou dormira votre animal ?
    waiting TEXT NOT NULL, --Qu'attendez vous de la part de votre animal?

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
        ---------------------------certificate---------------------------------------------------
    certificate_people BOOLEAN DEFAULT false, -- certificate to host_family
    approuved_people BOOLEAN DEFAULT false, -- read / approuved to host_family
    --------------------RESERVE BENEVOLE-----------------------------
    date_sending DATE DEFAULT NOW() NOT NULL, -- Date d'envois du questionnaire
    
    status TEXT DEFAULT 'En attente' NOT NULL, -- Status du questionnaire (En attente, Traité, Refusé, Sans suite, Adopté, Liste d'attente)
    meet TEXT, --  Si rencontre : Date de la rencontre
    refused_comment TEXT, -- si refusé : commentaire
    general_comment TEXT, -- commentaire en tout genre
    wait_pet TEXT, -- Quel type d'animal est attendu
    volunteer_assigned TEXT,
    new BOOLEAN DEFAULT true

);

CREATE TABLE "adoptant" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    number_id_passport TEXT,
    lastname VARCHAR (50) NOT NULL,
    firstname VARCHAR (25) NOT NULL,
    birthday TEXT,
    job TEXT,
    spouselastname VARCHAR (50) DEFAULT NULL,
    spousefirstname VARCHAR (25) DEFAULT NULL,
    spousebirthday TEXT DEFAULT NULL,
    spousejob TEXT DEFAULT NULL,
    postal_code VARCHAR(5) NOT NULL,
    number_phone VARCHAR(10) NOT NULL,
    number_phone2 VARCHAR(10),
    city TEXT NOT NULL,
    email VARCHAR (70) NOT NULL,
    adress TEXT NOT NULL,
    type_home TEXT,
    fbpseudo TEXT DEFAULT NULL,
    numberadulthome INT DEFAULT NULL,
    numberchlidhome INT DEFAULT NULL,
    petcomposition TEXT DEFAULT NULL,
    black_list BOOLEAN DEFAULT false,
    questionnaire_id int REFERENCES "questionnaire_adopt"(id) ON DELETE CASCADE
);

CREATE TABLE "pet" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    date_supported DATE, -- Date de prise en charge
    type VARCHAR(10) NOT NULL, -- type d'animal
    name VARCHAR(50), -- Nom de l'animal
    age DATE, -- age ou date de naissance de l'animal
    amity TEXT DEFAULT 'inconnu', -- ententes de l'animal
    sexe TEXT, -- sexe de l'animal
    breed TEXT, --Race de l'animal
    color TEXT, -- Robe de l'animal
    ide TEXT, -- identification de l'animal
    sterilised BOOLEAN DEFAULT false, -- si l'animal est sterilisé
    date_vaccine DATE, --date du dernier vaccin
    description TEXT, --description de l'animal
    weight TEXT, --taille de l'animal
    host_family_id int DEFAULT NULL REFERENCES "host_family"(id) ON DELETE SET NULL, --Id de la famille d'accueil
    adopt BOOLEAN DEFAULT false, -- Si l'animal est disponible à l'adoption
    date_adopting DATE DEFAULT NULL , --Date de l'adoption
    last_name_pet VARCHAR(50), -- Nom de l'animal donné par l'adoptant (si changement)
    facebook_publish BOOLEAN DEFAULT false,--Publié sur facebook
    seconde_chance_publish BOOLEAN DEFAULT false,--Publié sur seconde chance
    booked BOOLEAN DEFAULT false,--Booked
    booked_name TEXT,-- If pet Booked, name of adoptants
    deceased BOOLEAN DEFAULT false, --Si l'animal est décédé
    deceased_date DATE, -- date of death
    deceased_cause TEXT, -- cause of death
    site_publish BOOLEAN DEFAULT FALSE, -- Si un animal est publié ou non sur le site
    missingInfo BOOLEAN DEFAULT FALSE,-- Si une information est manquante
    avatar TEXT-- photo de profil d'un animal
);

CREATE TABLE "veterinary" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    "name" VARCHAR (50) NOT NULL, -- Nom de la clinique
    number_phone VARCHAR(10) NOT NULL, -- Numero de telephone
    postal_code VARCHAR(5) NOT NULL, -- Code postal
    city TEXT NOT NULL, -- Ville du veterinaire    
    adress TEXT NOT NULL, -- adresse du veterinaire
    email VARCHAR (70), -- email du veterinaire
    dog_castration TEXT, 
    dog_ovario_10 TEXT, 
    dog_ovario_10_25 TEXT,
    dog_ovario_25_40 TEXT, 
    dog_ovario_40 TEXT,
    dog_vaccine TEXT,
    dog_ide TEXT,
    cat_castration TEXT,
    cat_castration_tatouage TEXT,
    cat_ovario TEXT,
    cat_ovario_tatouage TEXT,
    cat_vaccine TEXT,
    cat_ide TEXT,
    oldVet BOOLEAN DEFAULT FALSE
);


CREATE TABLE "event" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,-- ID default
    title TEXT NOT NULL,
    "location" TEXT NOT NULL,
    date_event DATE NOT NULL,
    content TEXT NOT NULL,
    picture TEXT NOT NULL  
);

CREATE TABLE "condition_adopt"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,-- ID default
    "description" TEXT NOT NULL
);

CREATE TABLE "price_adopt"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,-- ID default
    dog_female TEXT,
    dog_male TEXT,
    cat_female TEXT,
    cat_male TEXT,
    puppy TEXT,
    kitten TEXT,
    dog_cat_female TEXT,
    dog_car_male TEXT,
    caution_kitten TEXT,
    caution_puppy TEXT
);

CREATE TABLE "purebred_pet"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,-- ID default
    extra BOOLEAN NOT NULL,
    extra_charge TEXT
);

CREATE TABLE "picture_pet"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,-- ID default
    title TEXT NOT NULL,
    pet_id INT NOT NULL REFERENCES "pet"(id) ON DELETE CASCADE
);

CREATE TABLE "picture_event"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,-- ID default
    title TEXT NOT NULL,
    event_id INT NOT NULL REFERENCES "event"(id) ON DELETE CASCADE
);

CREATE TABLE "commentaire_pet"( -- Commentaire au sujet d'un animal
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    pet_id int NOT NULL REFERENCES "pet"(id) ON DELETE CASCADE,
    commentaire TEXT NOT NULL,
    date_comment date NOT NULL DEFAULT now()
);

CREATE TABLE "commentaire_adoptant" ( --Commentaire au sujet d'un adoptant
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    adoptant_id int NOT NULL REFERENCES "adoptant"(id) ON DELETE CASCADE,
    commentaire TEXT NOT NULL,
    date_comment date NOT NULL DEFAULT now()
);



CREATE TABLE "notification" (    
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    notification_status BOOLEAN DEFAULT false,
    volunteer_assigned TEXT NOT NULL,
    volunteer_author TEXT NOT NULL,
    date_sending DATE DEFAULT NOW() NOT NULL,
    description TEXT,
    warning BOOLEAN DEFAULT false,
    label TEXT,
    date_treatment DATE
);

CREATE TABLE "blacklister" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID default
    number_id_passport TEXT,
    lastname VARCHAR (50) NOT NULL,
    firstname VARCHAR (25) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    number_phone VARCHAR(10) NOT NULL,
    city TEXT NOT NULL,
    email VARCHAR (70) NOT NULL,
    adress TEXT NOT NULL,
    comment TEXT NOT NULL,
    "date" date NOT NULL DEFAULT now()
);

ALTER TABLE "questionnaire_adopt" ADD pet_id int REFERENCES "pet"(id) ON DELETE SET NULL; 
ALTER TABLE "pet" ADD adoptant_id int DEFAULT NULL REFERENCES "adoptant"(id) ON DELETE SET NULL;



COMMIT;
