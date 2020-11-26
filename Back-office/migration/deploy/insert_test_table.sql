-- Deploy asela:insert_test_table to pg

BEGIN;
------------------- FAMILLES D'ACCUEILS -----------------------

INSERT INTO "host_family" ("lastname", "firstname", "number_phone", "postal_code", "city", "adress", "email", "pet_composition", "pet_accepted")
VALUES ('Le Boudouil', 'Sophie', 'O687388358', '30230', 'Bouillargues', '1300 Chemin Mas de beaud', 'epona1@live.fr', '2 chiens', 'Chien femelle'),
       ('Prud hame', 'Genevieve', '0665670361', '30129', 'Redessan', '3 Rue du 19 Mars 1961', 'genevieve.curty@orange.fr', 'Chiens/Chats', 'Chiens'),
       ('Vargas Canino', 'Silvia', '0669341885', '30000', 'Nîmes', '62 Rue Alain Massot', 'silvia8nimes@yahoo.fr', '0', 'Chiens'),
       ('Laurent', 'Marine', '0776693182', '30200', 'Codolet', '9 Place Marcel Pagnol', 'marinelaurent01@gmail.com', '1 chien', 'Chiens'),
       ('Roux', 'Françoise', '0633785208', '30210', 'Argilliers', 'Impasse de l Arceau', 'roux.francoise30@gmail.com', '0', 'Chiens'),
       ('Gleyze', 'Severine', '0783342291', '30500', 'St Ambroix', '663 Route de Saint Germain', 'gleyzemaelia@gmail.com', '0', 'Chiens'),
       ('Couillet', 'Rachelle', '0666708152', '30660', 'Gallargues le Montueux', 'Chemin de Veidran', 'rachele.c@hotmail.fr', '0', 'Chiens/Chiots'),
       ('Coesen', 'Ornella', '0680000144', '30260', 'Quissac', '63 Rue du Four de Veidran', 'portmannornella@gmail.com', '0', 'Chiens'),
       ('0', 'Severine', '0', '30380', 'St Christol les Ales', '280 Rue des Tilleuls', '0', '0', 'Chatons'),
       ('0', 'Aurelia', '0789570870', '0', 'Ales', '471 Chemin des sports', '0', '0', 'Chatons'),
       ('0', 'Audrey', '0642333134', '30100', 'Ales', '414 D Avenue Dr Jean Gaubert', 'audrey.simon16@orange.fr', '0', 'Chatons'),
       ('0', 'Brigitte', '0768204153', '30260', 'Quissac', '64 Impasse des rouges gorges', 'brissal@homtail.fr', '0', 'Chatons'),
       ('Meunier Fevrier', 'Cathy', '0670257748', '30170', 'Saint Hyppolyte du Fort', '22 Route de Cros', 'cathyfevrier@neuf.fr', '0', 'Chatons'),
       ( 'Boursier', 'Sarah', '0687614328', '30350', 'Aigremont', '6 Rue du Nord', 'christian.boursier11@orange.fr', '0', 'Chatons'),
       ('Lopez', 'Emilie', '0658915220', '30110', 'St Cecile D Andorge','La haute levade ouest', 'elena04@outlook.fr', '0', 'Chatons'),
       ('Perez', 'Cendrine', '0615074798', '30870', 'St Come et Maruejols','48 chemin de la fontaine de robert', 'cendrineperez@hotmail.fr', '0', 'Chatons'),
       ('Savri', 'Magali', '0609988497', '30000', 'Nimes', '866 Chemin des Terres de Rouviere', 'savrimagali@gmail.com', '0', 'Chatons'),
       ('Sanchez', 'Alizée', '0781025042', '34170', 'Castelnau Le Lez', '18 rue des genets', 'alizee.sanchez0882@hotmail.fr', '6 chats un chien','Chien'),
       ('Soutoul', 'Anna', '0784515210', '34170', 'Castelnau Le Lez', '4 imp puits de cours', 'anna.sout@outlook.fr', 'Chats et chiens','Chiens et chats'),
       ('Roger', 'Gabriel', '0675953598', '34000', 'Montpellier', '130 av de palavas', 'gabriel395@hotmail.fr', '2 Chats','Chien');


------------------- ANIMAUX -----------------------

INSERT INTO pet ("type", "name", "age", "amity", "sexe", "breed", "ide", "sterilised", "description", "weight", "host_family_id") 
VALUES ('chien', 'Royco','13/03/2020','Ok chiens et chats', 'Mâle', 'X Beagle', '250268743488611', 'true', 'description', 'Moyenne taille','19'),
       ('chien', 'Rex',' 01/01/2017','Ok chiens et chats', 'Mâle', 'Border collie x berger groenendael', '250268723102192', 'true', 'description', 'Grande taille','19'),
       ('chien', 'Nouba','06/10/2017','Ok chiens et chats', 'Mâle', 'X Berger', '250269811395817', 'true','description', 'Très grand gabarit','20'),
       ('chien', 'Santo','20/01/16','Inconnus mais ne semble pas agressif', 'Mâle', 'X Beauceron et Doberman', '250269606628846', 'true', 'description', 'Très grand gabarit','19'),
       ('chien', 'Hashtag','25/06/2017','Chiens femelle Ok Mâle a tester - Chats a tester', 'Mâle', 'x Labrador', '250269500740253', 'true', 'description', 'Moyen gabarit','19'),
       ('chien', 'Pipo', '01/10/2018','Ok chiens et chats', 'Mâle', ' X Griffon', 'false', 'true', 'description', 'Moyen gabarit','19'),
       ('chien', 'Bianca', '04/04/2018','Ok chiens et chats', 'Femelle', 'x Griffon', '250268732448608', 'true', 'description', 'Moyen gabarit','1'),
       ('chien', 'Ice Tea', '16/08/2013','Ok chiens et chats', 'Mâle', 'Cane Corso', 'false', 'true', 'description', 'Très grand gabarit', NULL),
       ('chien', 'Jocky', '01/09/2011','Ok chiens et chats', 'Mâle', 'Border collie x berger groenendael', '250268743500214', 'true', 'description', 'Petit gabarit', NULL),
       ('chien', 'Bebidou', '29/04/2014','Ok chiens et chats', 'Femelle', 'Cane Corso', 'false', 'true', 'description', 'Très grand gabarit', NULL);

INSERT INTO pet ("type", "name", "age", "amity", "sexe", "breed", "ide", "sterilised", "description", "weight", "host_family_id")
VALUES
       ('chat', 'Joséphine', '01/01/2017','Pas ok chats adultes', 'Femelle', 'Europeen', '243UUJ', 'true', 'description', '0', '19'),
       ('chat', 'Naya', '18/04/17','Ok chats', 'Femelle', 'Europeen', '228LDU', 'true', 'description', '0','19'),
       ('chat', 'Noisette', '02/07/2020','Ok chats', 'Femelle', 'Europeen', '279YZT', 'true', 'description', '0','19'),
       ('chat', 'Onix', '15/04/18','Ok chats', 'Femelle', 'Europeen', '261FDG', 'true', 'description', '0','19'),
       ('chat', 'Noa', '15/05/17','Ok chats et chiens', 'Mâle', 'Europeen', '222JMV', 'true', 'description', '0','19'),
       ('chat', 'Myrtille', '01/01/2018','Ok chats', 'Femelle', 'Europeen', '261BUL', 'true', 'description', '0','19');


------------------VETERINAIRES-----------------------

INSERT INTO "veterinary" ("name", "number_phone", "postal_code", "city", "email", "adress")
VALUES ('Bente', '0466622323', '30900', 'Nimes', '0', 'Bente 59 Route D Ales'),
       ('Brochot', '0466298838', '30900', 'Nimes', 'veto@brochot.org', '1233 Avenue Marechal Juin'),
       ('Gossiaux', '0466549052', '30110', 'La Grand Combe', 'catherine.gossiaux@sfr.fr', '17 Rue des poilus'),
       ('Daudeville', '0466266879', '30000', 'Nimes', 'daudeville-chanadet@orange.fr', '141 bis Route de Beaucaire'),
       ('Clinique du Gardon', '0466372457', '30210', 'Remoulins', '0', 'Avenue Geoffrey Perret'),
       ('Clinique de Pierrelatte', '0475040003', '26700', 'Pierrelatte', '0', 'Avenue Delattre de Tassigny'),
       ('Cabinet de La Ceze', '0466799270', '30200', 'Bagnols sur Ceze', 'contact@ceterinairedelaceze.com', 'Chemin de la Font des Chiens'),
       ('Clinique des Cévennes', '0', '30500', 'St Ambroix', 'stambroix@notreveto.fr', '5 fb du Paradis'),
       ('Clinique de la Porte d Or', '0466390914', '30130', 'Pont-Saint-Esprit', '0', '492 Chemin Columbia'),
       ('Clinique du Le Pontet', '0490310074', '84130', 'Le Pontet', '0', '27 Ruelle Du Perigord'),
       ('Cabinet La Cigale', '0466776740', '30170', 'Saint-Hippolyte-du-Fort', '0', 'St Hyppo Place Enfants de Troupe'),
       ('Vetalia', '0466858848', '30340', 'St Privat Des Vieux', '0', '108 Vieille Route De Salindre'),
       ('Clinique Vétérinaire des Espinaux', '0466860737', '30340', 'St Privat Des Vieux', '0', '27 Av Paul Valery'),
       ('Clinique Veterinaire de Cambajon', '0466817021', '30190', 'Sauzet', '0', '155 Ch De Font Barjarret'),
       ('Clinique Animavet', '0467715029', '34400', 'Lunel', 'clinique-animavet@orange.fr', '333 Allee Du Vidourle'),
       ('Clinique du Vigan', '0467738690', '34190', 'Ganges', 'vetganges@orange.fr', '19 avenue du Vigan'),
       ('Vétérinaire Brassart', '0467875195', '34820', 'Ganges', 'vetganges@orange.fr', '28 Avenue de Montpellier'),
       ('Clinique Veterinaire de Baillargues', '0467738690', '34670', 'Baillargues', 'vetganges@orange.fr', 'Imp Charles Fournier');

------------------- EVENEMENTS -----------------------
INSERT INTO "event" ("title", "location", "date_event", "content", "picture") 
VALUES ('Adoption National', 'Nîmes', '2019/12/07', 'Nous avons participé au week end Adoption National avec Truffaut NÎMES. Les 4 chatons présents ont été adoptés et les chats Joséphine, Passoa, Pipo et Noxy ont été proposés à l adoption. Les familles d’accueil ont encore une fois répondu présents avec Oméga, Punch, Marlon, Gaia et Kira. Le photographe animalier de Truffaut et la spécialiste Royal Canin étaient présents aussi. L’association étudiante de protection animale de l’EMA( Ecole d’ingénieur des Mines Alès ) a participé à la remise de Flyers et à la collecte des croquettes, pâtés, friandises et jouets pour nos protégés.', '18.03.2019.png'),
       ('Le vide grenier du Dimanche 29 septembre', 'Sauve', '2019/09/29', 'Nos super étudiants de l’EMA étaient présents pour nous aider à préparer le vide grenier de Serge Garcia est venir nous soutenir avec la vente de son livre à mettre dans toutes les mains (ou presque) FACE DE RIRE. Joana nous a régalé avec sa recette Sandwich chaud saucisse oignons au vin blanc.', '18.03.2019.png'),
       ('Le vide grenier du Samedi 25 mai', 'Sauve', '2019/05/25', 'Le vide grenier à Sauve (30) a eu un franc succès. On pouvait boire un café, manger un morceau (sandwich saucisse, pain bagnat etc…) Déguster un dessert ou prendre une boisson ! Et parler de nos animaux à l''adoption. L’ association étudiante de protection animale de l’EMA (Ecole d’ingénieur des Mines Alès) était présente et a participé activement.', '18.03.2019.png'),
       ('Le vide grenier du Dimanche 17 mars', 'Sauve', '2019/03/19', 'Le vide grenier à Sauve (30) a eu un franc succès. On pouvait boire un café, manger un morceau (sandwich saucisse, pain bagnat etc…) Déguster un dessert ou prendre une boisson ! Et parler de nos animaux à l''adoption. L’ association étudiante de protection animale de l’EMA (Ecole d’ingénieur des Mines Alès) était présente et a participé activement.', '18.03.2019.png'),
       ('Opération caddie', 'Nîmes', '2019/03/02', 'Opération caddie pour nos protégés à pattes à Truffaut Nîmes. Le comité Miss France 15/17 Languedoc Roussillon est venu nous prêter main forte avec leur 1ere dauphine : Nous remercions l''aide efficace et souriante de Coralie Berdaguer et de sa famille. Gaia et Kiran étaient aussi présents avec leur famille d’accueil.', '18.03.2019.png'),
       ('Opération caddie', 'Nîmes', '2019/01/25', 'Opération caddie afin de collecter des sacs de croquettes, patés, litières pour nos protégés à Truffaut Nîmes. Nous avons été aidés par nos familles d’accueil et nos bénévoles. Téquila y a trouvé sa famille d accueil.', '18.03.2019.png'),
       ('Brocante/vide grenier du dimanche 18 octobre 2020', 'Sauve', '2020/10/18', 'Le vide grenier, c''est comme d''habitude déroulé dans une bonne ambiance générale, des stands pour des boissons, on pouvait boire un café, manger un morceau et surtout parler de nos petits protégés. Merci à tous les participants, visiteurs de même qu''a toute l''équipe de bénévoles qui nous ont aidés.', '18.03.2019.png'),
       ('Forum des associations et opération caddie du dimanche 05 septembre 2020', 'Gard', '2020/09/05', 'Une partie de notre équipe était présente au forum des associations avec certains de nos loulous, dont 3 tout nouveaux arrivants, nous étions heureuses de répondre a toutes vos questions et de rencontrer les autres nombreuses associations de Sauve. La seconde partie des bénévoles était quand à eux au Truffaut de Nîmes dans une opération caddie qui s''est très bien déroulé, un grand merci à tous pour votre générosité !', '18.03.2019.png');


------------------- Tarif -----------------------
INSERT INTO "price_adopt" ("type_pet", "sexe_pet", "price", "caution")
VALUES ('Chiens', 'Femelle', '270', '0'),
       ('Chiens', 'Mâle', '240', '0'),
       ('Chiots', 'Mâle', '180', '250'),
       ('Chiots', 'Femelle', '180', '250'),
       ('Chiens de catégorie', 'Femelle', '270', '0'),
       ('Chiens de catégorie', 'Mâle', '240', '0'),
       ('Chats', 'Femelle', '130', '0'),
       ('Chats', 'Mâle', '100', '0'),
       ('Chatons', 'Femelle', '65', '200'),
       ('Chatons', 'Mâle', '65', '200');

------------------- Condition-----------------------

INSERT INTO "condition_adopt" ("description")
VALUES ('Ne pas lui infliger de mauvais traitements et lui fournir l''attention et les soins nécessaires à sa santé et son bien-être : Code Rural L214-1 « Tout animal étant un être sensible doit être placé par son propriétaire dans des conditions compatibles avec les impératifs biologiques de son espèce »'),
       ('Stérilisation/ Castration OBLIGATOIRE'),
       ('Ne pas faire vivre l''animal dans un enclos.'),
       ('Ne pas utiliser de collier étrangleur.'),
       ('Ne pas utiliser l''animal à des fins de chasse ni a toute autre fin qu''animal de compagnie.'),
       ('Ne pas attacher l''animal au domicile.'),
       ('Signaler à l''association tout changement d''adresse / téléphone ou tout changement qui pourrait nous être utile.'),
       ('Si pour une quelconque raison vous devez vous séparer de l''animal ça serait exclusivement auprès de l’Association Sauve Et Les Animaux, vous ne pourrez ni le vendre, ni le céder. Aucun remboursement des frais d’adoption ne pourra être réclamé à l’Association.'),
       ('Si une des conditions d’adoption n’est pas respectée, l’Association Sauve Et Les Animaux peut à tout moment reprendre l’animal.');

-------------------Famille d'accueil chien--------------------

UPDATE pet SET host_family_id = 1 WHERE id = 7;

COMMIT;
