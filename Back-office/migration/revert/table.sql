-- Revert asela:table from pg

BEGIN;

DROP TABLE "blacklister";
DROP TABLE "questionnaire_FH";
DROP TABLE "questionnaire_adopt";
DROP TABLE "price_veterinary";
DROP TABLE "commentaire_adoptant";
DROP TABLE "commentaire_host_familly";
DROP TABLE "commentaire_pet";
DROP TABLE "picture_event";
DROP TABLE "picture_pet";
DROP TABLE "price_adopt";
DROP TABLE "condition_adopt";
DROP TABLE "event";
DROP TABLE "veterinary";
DROP TABLE "pet";
DROP TABLE "adoptant";
DROP TABLE "host_family";
DROP TABLE "volunteer";

COMMIT;
