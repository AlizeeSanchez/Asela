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

    correspondanceSearch: async (questionnaire) => {
        try {
            const questionnaireCorresp = await db.query('SELECT * FROM questionnaire_adopt WHERE (email = $1) OR (number_phone = $2) OR (lastname = $3 AND firstname = $4)', [questionnaire.email, questionnaire.number_phone, questionnaire.lastname, questionnaire.firstname]);
            return questionnaireCorresp.rows;
            
        }
        catch(error){
            console.trace(error)
        }
    },

    blackListSearch: async (questionnaire) => {
        try {
            const blackListSearch = await db.query('SELECT * FROM blacklister WHERE (email = $1) OR (number_phone = $2) OR (lastname = $3 AND firstname = $4)', [questionnaire.email, questionnaire.number_phone, questionnaire.lastname, questionnaire.firstname]);
            return blackListSearch.rows;     
        }
        catch(error){
            console.trace(error)
        }
    },

    //Ajouter un questionnaire
    responseQuest: async (questionnaire) => {
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
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    },

    updateSame: async (questionnaire) => {
        try{
            const Same = await db.query(`UPDATE questionnaire_adopt SET name_pet = $1, pet_id = NULL, refused_comment = NULL, date_sending = NOW() WHERE id = $2;`, [questionnaire.name_pet, questionnaire.id]);
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
            const questionnaire = await db.query(`SELECT * FROM pet JOIN questionnaire_adopt ON pet.id = questionnaire_adopt.pet_id WHERE status = 'Traité' ORDER BY date_sending DESC`); 
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
    passQuestToAdoptant: async (data) => {
        try{
            const addAdoptant = await db.query(`INSERT INTO adoptant (lastname, firstname, birthday, job, spouselastname, spousefirstname, spousebirthday, spousejob, postal_code, number_phone, city, email, adress, type_home, fbpseudo, numberadulthome, numberchlidhome, petcomposition, questionnaire_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *;`,[
                data[0].lastname, 
                data[0].firstname,
                data[0].date_birth,
                data[0].occupation, 
                data[0].spouselastname,
                data[0].spousefirstname,
                data[0].date_birth_spouse,
                data[0].occupation_spouse,
                data[0].postal_code,
                data[0].number_phone, 
                data[0].city, 
                data[0].email,
                data[0].adress,
                data[0].type_residence,
                data[0].facebook_pseudo,
                data[0].number_adult,
                data[0].number_children,
                data[0].pet_familly2,
                data[0].id    
            ]);
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
    },

    //Traité un questionnaire
    traitedQuest: async (data) => {
        try {
            const valide = await db.query(`UPDATE questionnaire_adopt SET pet_id = $1, status = 'Traité', general_comment = $2, new = false ,WHERE id = $3;`, [
                data.pet_id,
                data.comment,
                data.id
            ]);
            return valide.rows[0];
        }catch(error){
            console.trace(error)
        }
    },

    //Traité un questionnaire pour rencontre
    meetQuest: async (data) => {
        try {
            const meet = await db.query(`UPDATE questionnaire_adopt SET pet_id = $1, status = 'Traité', general_comment = $2, meet = $3, new = false WHERE id = $4;`, [
                data.pet_id, 
                data.comment,
                data.meet,
                data.id
            ]);
            return meet.rows[0];
        }catch(error){
            console.trace(error)
        }
    },

    //Refusé un questionnaire
    refusedQuest: async (data) => {
        try {
            const questRefused = await db.query(`UPDATE questionnaire_adopt  SET status = $1 , refused_comment = $2, new = false WHERE id = $3;`, [
                data.status, 
                data.comment,
                data.id
            ]);
            return questRefused.rows[0];
        }catch(error){
            console.trace(error)
        }
    },

    //Passer a 'sans suite' un questionnaire
    abandonnedQuest: async (data) => {
        try {
            const valide = await db.query(`UPDATE questionnaire_adopt SET status = 'Sans suite', general_comment = $1, new = false WHERE id = $2;`, [
                data.comment,
                data.id
            ]);
            return valide.rows[0];
        }catch(error){
            console.trace(error)
        }
    },

    //Passer un questionnaire à 'adoptant'
    adoptQuest: async (data) => {
        try {
            const valide = await db.query(`UPDATE questionnaire_adopt SET status = 'Adoptant', general_comment = $1, meet = $2, new = false  WHERE id = $3;`, [
                data.comment,
                data.meet,
                data.id
            ]);
            return valide.rows[0];
        }catch(error){
            console.trace(error)
        }
    },

    //Liste d'attente d'un questionnaire
    waitList: async (data) => {
        try {
            const wait = await db.query(`UPDATE questionnaire_adopt SET pet_id = $1, status = $2, wait_pet = $3 WHERE id = $4;`, [
                data.pet_id,
                data.status,
                data.comment,
                data.id
            ]);
            return wait.rows[0];
        }catch(error){
            console.trace(error)
        }
    },
    
}

module.exports = QuestionnaireAdopt;
