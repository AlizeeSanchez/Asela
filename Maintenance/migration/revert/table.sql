-- Revert asela:table from pg

BEGIN;

DROP TABLE "blacklister";
DROP TABLE "notification";
DROP TABLE "questionnaire_adopt";
DROP TABLE "commentaire_adoptant";
DROP TABLE "commentaire_pet";
DROP TABLE "picture_event";
DROP TABLE "picture_pet";
DROP TABLE "purebred_pet";
DROP TABLE "price_adopt";
DROP TABLE "condition_adopt";
DROP TABLE "event";
DROP TABLE "veterinary";
DROP TABLE "pet";
DROP TABLE "adoptant";
DROP TABLE "host_family";
DROP TABLE "volunteer";

COMMIT;