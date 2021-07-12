-- Deploy asela:insert_test_table to pg

BEGIN;

INSERT INTO "volunteer" ("lastname","firstname","postal_code","number","mail","adress","city", "password") 
VALUES ('alizee','sanchez','34170','0781025042','alizee.sanchez0882@hotmail.fr', '18 rue des genets', 'Castelnau-le-lez', '$2b$10$V01Uvm.OGZbZs15ebw.4CuYyy6NYdlWAIwN46g3chTpIHHaGKNNxG');


------------------- Tarif -----------------------
INSERT INTO "price_adopt" ("dog_female", "dog_male", "cat_female" , "cat_male" , "puppy" , "kitten" , "dog_cat_female" , "dog_car_male" , "caution_kitten" , "caution_puppy")
VALUES ('240', '280', '140', '100', '200', '75', '300', '250', '250', '250');

------------------- purebred_pet -----------------------
INSERT INTO "purebred_pet" ("extra", "extra_charge")
VALUES ('true', '100€');


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

COMMIT;

------------------- Pet-----------------------
