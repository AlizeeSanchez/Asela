const db = require("../database");

const QuestionnaireAdopt = {


    //route pour check dans les questionnaires
    findAllQuestAdopt: async () => {
        try {
            const questAdopt = await db.query('SELECT * FROM questionnaire_adopt');
            return questAdopt.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    correspondenceQuest: async (questionnaire) => {
        try {
            const questionnaireCorresp = await db.query('SELECT questionnaire_adopt.email, questionnaire_adopt.number_phone, questionnaire_adopt.date_sending ,questionnaire_adopt.type_pet, questionnaire_adopt.name_pet FROM questionnaire_adopt WHERE email = $1 OR number_phone = $2', [questionnaire.email, questionnaire.number_phone]);
            return questionnaireCorresp.rows[0];
        }
        catch(error){
            console.trace(error)
        }
    },

    //Ajouter un questionnaire
    responseQuest: async (questionnaire) => {
        try{
        const addQuest = `INSERT INTO questionnaire_adopt ("email", "type_pet", "name_pet", "lastname", "firstname", "date_birth", "occupation",    "lastname_firstname_spouse", "date_birth_spouse", "occupation_spouse", "number_phone", "postal_code", "city", "adress", "shifting",    "type_residence", "height_fence", "proprietor", "number_adult", "number_children", "age_children", "allergy", "adopt_assos", "adopt_assos2",   "trust_assos", "trust_assos2", "pet_familly", "pet_familly2", "pet_familly_deceased", "veterinary", "veterinary2", "veterinary3",     "disponibility", "disponibility2", "holiday", "holiday2", "awareness", "education", "informed", "adopt", "adopt2", "tomove", "sterilization",   "forbearance","cleanliness", "amity", "garden", "bed", "waiting", "motivation", "declawing", "race_pet", "petstatus", "responsability",   "education2", "cage", "cage2", "absent", "present", "activity", "activity2", "educator", "educator2", "educator3", "facebook_pseudo",  "advertisement", "free") VALUES ( $1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,   $29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65,$66, $67) RETURNING *;`;
        const data = await db.query(addQuest, [
            questionnaire.email,
            questionnaire.type_pet,
            questionnaire.name_pet,
            questionnaire.lastname,
            questionnaire.firstname,
            questionnaire.date_birth,
            questionnaire.occupation,
            questionnaire.lastname_firstname_spouse,
            questionnaire.date_birth_spouse,
            questionnaire.occupation_spouse,
            questionnaire.number_phone,
            questionnaire.postal_code,
            questionnaire.city,
            questionnaire.adress,
            questionnaire.shifting,
            questionnaire.type_residence,
            questionnaire.height_fence,
            questionnaire.proprietor,
            questionnaire.number_adult,
            questionnaire.number_children,
            questionnaire.age_children,
            questionnaire.allergy,
            questionnaire.adopt_assos,
            questionnaire.adopt_assos2,
            questionnaire.trust_assos,
            questionnaire.trust_assos2,
            questionnaire.pet_familly,
            questionnaire.pet_familly2,
            questionnaire.pet_familly_deceased,
            questionnaire.veterinary,
            questionnaire.veterinary2,
            questionnaire.veterinary3,
            questionnaire.disponibility,
            questionnaire.disponibility2,
            questionnaire.holiday,
            questionnaire.holiday2,
            questionnaire.awareness,
            questionnaire.education,
            questionnaire.informed,
            questionnaire.adopt,
            questionnaire.adopt2,
            questionnaire.tomove,
            questionnaire.sterilization,
            questionnaire.forbearance,
            questionnaire.cleanliness,
            questionnaire.amity,
            questionnaire.garden,
            questionnaire.bed,
            questionnaire.waiting,
            questionnaire.motivation,
            //chat
            questionnaire.declawing,
            //chien
            questionnaire.race_pet,
            questionnaire.petstatus,
            questionnaire.responsability,
            questionnaire.education2,
            questionnaire.cage,
            questionnaire.cage2,
            questionnaire.absent,
            questionnaire.present,
            questionnaire.activity,
            questionnaire.activity2,
            questionnaire.educator,
            questionnaire.educator2,
            questionnaire.educator3,
            questionnaire.facebook_pseudo,
            questionnaire.advertisement,
            questionnaire.free
        ]);
        console.log("monconsole log de mon foutu questionnaire a ralonge :", questionnaire);
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    }

}

module.exports = QuestionnaireAdopt;
