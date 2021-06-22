const db = require("../database");

const QuestionnaireAdopt = {

    //route pour check dans les questionnaires
    findAllQuestAdopt: async () => {
        try {
            const questAdopt = await db.query('SELECT questionnaire_adopt.id, questionnaire_adopt.status, questionnaire_adopt.email, questionnaire_adopt.number_phone FROM questionnaire_adopt');
            return questAdopt.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //route pour check un questionnaire
    findOneQuestAdopt: async (id) => {
        try {
            const questAdopt = await db.query('SELECT * FROM questionnaire_adopt WHERE id = $1', [id]);
            return questAdopt.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    correspondenceQuest: async (questionnaire) => {
        try {
            const questionnaireCorresp = await db.query('SELECT questionnaire_adopt.id, questionnaire_adopt.email, questionnaire_adopt.number_phone, questionnaire_adopt.date_sending ,questionnaire_adopt.type_pet, questionnaire_adopt.name_pet FROM questionnaire_adopt WHERE email = $1 OR number_phone = $2', [questionnaire.email, questionnaire.number_phone]);
            return questionnaireCorresp.rows[0];
            console.log('questionnaireCorresp', questionnaireCorresp);
        }
        catch(error){
            console.trace(error)
        }
    },

    //Ajouter un questionnaire
    responseQuest: async (questionnaire) => {
        console.log('je rentre dans mon model', questionnaire);
        try{
        const addQuest = `INSERT INTO questionnaire_adopt ("email", "type_pet", "name_pet", "lastname","firstname", "date_birth", "occupation",    "lastname_firstname_spouse", "date_birth_spouse", "occupation_spouse", "number_phone", "postal_code", "city", "adress", "shifting",    "type_residence", "height_fence", "proprietor", "number_adult", "number_children", "age_children", "allergy", "adopt_assos", "adopt_assos2",   "abandoned_assos", "abandoned_assos2", "pet_familly", "pet_familly2", "pet_familly_deceased", "veterinary", "veterinary2", "veterinary3",     "disponibility", "disponibility2", "holiday", "holiday2", "awareness", "education", "informed", "adopt", "adopt2", "tomove", "sterilization",   "forbearance","cleanliness", "amity", "garden", "bed", "waiting", "motivation", "declawing", "race_pet", "petstatus", "responsability",   "education2", "cage", "cage2", "absent", "present", "activity", "activity2", "educator", "educator2", "educator3", "facebook_pseudo",  "advertisement", "free") VALUES ( $1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,  $29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65,$66,$67) RETURNING *;`;
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
            questionnaire.abandoned_assos,
            questionnaire.abandoned_assos2,
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
        console.log('mes donnée du formulaire', data);
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    },

    //1. MISE A JOUR : je veux entré toutes les questions concernant les chiens dans ma table et general_comment et remetre a NULL pet_id, meet, refused_comment + mettre date_sending a now()
    updateCatToDog: async (questionnaire) => {
        try{
            const catToDog = await db.query(`UPDATE questionnaire_adopt SET type_pet = 'chien', name_pet = $1, race_pet = $2, petstatus = $3, responsability = $4, education2 = $5, cage = $6, cage2 = $7, absent = $8, present = $9, activity = $10, activity2 = $11, educator = $12, educator2 = $13, educator3 = $14, pet_id = NULL, refused_comment = NULL, date_sending = NOW() WHERE id = $15;`, [questionnaire.name_pet, questionnaire.race_pet,questionnaire.petstatus, questionnaire.responsability, questionnaire.education2, questionnaire.cage, questionnaire.cage2, questionnaire.absent, questionnaire.present, questionnaire.activity, questionnaire.activity2, questionnaire.educator, questionnaire.educator2, questionnaire.educator3, questionnaire.id]);
            return catToDog;
            
        }
        catch(error){
            console.trace(error)
        }
    },
    
    //1. MISE A JOUR : je veux entré toutes les questions concernant les chats dans ma table et general_comment et remetre a NULL pet_id, meet, refused_comment + mettre date_sending a now()
    updateDogToCat: async (questionnaire) => {
        try{
            const DogToCat = await db.query(`UPDATE questionnaire_adopt SET type_pet = 'chat', name_pet = $1, declawing = $2, pet_id = NULL, refused_comment = NULL, date_sending = NOW() WHERE id = $3;`, [questionnaire.name_pet, questionnaire.declawing, questionnaire.id]);
            return DogToCat;
        }
        catch(error){
            console.trace(error)
        }
    },

    updateSame: async (questionnaire) => {
        try{
            const Same = await db.query(`UPDATE questionnaire_adopt SET name_pet = $1, pet_id = NULL, refused_comment = NULL, date_sending = NOW() WHERE id = $2;`, [questionnaire.name_pet, questionnaire.id]);
            console.log(Same);
            return Same;
        }
        catch(error){
            console.trace(error)
        }
    },

    //Supprimer 
    suppQuest: async (quest) => {
        try{
        const suppQuest = await db.query('DELETE FROM questionnaire_adopt WHERE id = $1;',[quest])
        }
        catch (error) {
            console.trace(error);
        }
        
    },

    // Commenter un questionnaire
    updateQuest: async (quest) => {
        try{
            const upPet = await db.query(`UPDATE questionnaire_adopt SET pet_id = $1, status = $2, meet = $3, refused_comment = $4, general_comment = $5 WHERE id = $6`, [quest.pet_id, quest.status, quest.meet, quest.refused_comment, quest.general_comment, quest.id]);
            console.log(quest.pet_id, quest.status, quest.meet, quest.refused_comment, quest.general_comment, quest.id);
            return upPet;
            
        }catch(error){
            console.trace(error);
        }
    },
    
    //afficher un questionnaire par son pet_id
    findOneQuestAdoptByPetID: async (pet_id) => {
        try {
            const questAdoptPetId = await db.query('SELECT * FROM questionnaire_adopt WHERE pet_id = $1', [pet_id]);
            return questAdoptPetId.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //Afficher les questionnaires "En attentes"
    findAllQuestAdoptWaiting: async () => {
        try {
            const questionnaire = await db.query(`SELECT * FROM questionnaire_adopt WHERE status = 'En attente' ORDER BY date_sending DESC`);           
            return questionnaire.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //Afficher les questionnaires "Traité"
    findAllQuestAdoptProcessed: async () => {
        try {
            const questionnaire = await db.query(`SELECT * FROM questionnaire_adopt WHERE status = 'Traité' ORDER BY date_sending DESC`);           
            return questionnaire.rows;
        }
        catch(error){
            console.trace(error)
        }
    },
    
    //Afficher les questionnaires Refusé
    findAllQuestAdoptRefused: async () => {
        try {
            const questionnaire = await db.query(`SELECT * FROM questionnaire_adopt WHERE status = 'Refusé' ORDER BY date_sending DESC`);
            return questionnaire.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //Sans suite
    findAllQuestAdoptDiscontinued: async () => {
        try {
            const questionnaire = await db.query(`SELECT * FROM questionnaire_adopt WHERE status = 'Sans suite' ORDER BY date_sending DESC`);
            return questionnaire.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //Adopté
    findAllQuestAdopted: async () => {
        try {
            const questionnaire = await db.query(`SELECT * FROM questionnaire_adopt WHERE status = 'Adoptant' ORDER BY date_sending DESC`);
            return questionnaire.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //Liste attente
    /*findAllQuestWaintingList: async () => {
        try {
            const questionnaire = await db.query(`SELECT * FROM questionnaire_adopt WHERE status = 'Liste d'attente' ORDER BY date_sending DESC`);
            return questionnaire.rows;
        }
        catch(error){
            console.trace(error)
        }
    },*/
   
    //Passer les données d'un questionnairez adoption à "adoptant", on passe aussi le chien a "adopté = true" et on donne l'id de l'adoptant a l'animal
    passQuestToAdoptant: async (quest) => {
        try{
            const addAdoptant = await db.query(`INSERT INTO adoptant (lastname, firstname, number_phone, postal_code, city, adress, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,[quest[0].lastname, quest[0].firstname, quest[0].number_phone, quest[0].postal_code, quest[0].city, quest[0].adress, quest[0].email]);
            return addAdoptant.rows;
        }catch(error){
            console.trace(error)
        }
    },
    
    //Passer les données d'un questionnaire adoption a "blacklister"
    putOneQuestToBlacklist: async (quest) => {
        try {
            const questAdoptant = await db.query(`INSERT INTO blacklister (lastname, firstname, postal_code, number_phone, city, email, adress, explication) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`, [quest.lastname, quest.firstname, quest.postal_code, quest.number_phone, quest.city, quest.email, quest.adress, quest.explication]);
            return questAdoptant.rows;
        }catch(error){
            console.trace(error)
        }
    }
    
}

module.exports = QuestionnaireAdopt;
