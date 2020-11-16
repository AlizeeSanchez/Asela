-- Revert asela:table from pg

BEGIN;

DROP TABLE "pet_has_supported";
DROP TABLE "pet_has_host_family";
DROP TABLE "pet_has_adoptant";
DROP TABLE "picture_event";
DROP TABLE "picture_pet";
DROP TABLE "PRICE_adopt";
DROP TABLE "condition_adopt";
DROP TABLE "event";
DROP TABLE "veterinary";
DROP TABLE "supported";
DROP TABLE "adoptant";
DROP TABLE "host_family";
DROP TABLE "pet";
DROP TABLE "volunteer";

COMMIT;
