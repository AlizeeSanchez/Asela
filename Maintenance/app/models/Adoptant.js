const db = require("../database");


const AdoptantModels = {

    //route pour check dans les questionnaires
    findAllAdoptant: async () => {
        try {
            const adoptants = await db.query('SELECT adoptant.id, adoptant.lastname, adoptant.firstname, adoptant.spousefirstname, adoptant.spouselastname, adoptant.postal_code, adoptant.city, adoptant.number_phone, adoptant.type_home, adoptant.email, adoptant.adress, pet.name, pet.date_adopting, pet.adoptant_id FROM adoptant JOIN pet ON adoptant.id = pet.adoptant_id ORDER BY date_adopting');
            return adoptants.rows;
        }
        catch(error){
            console.trace(error)
        }
    },

    //route pour voir un adoptant
    findOneAdoptant: async (id) => {
        try {
            const adoptant = await db.query('SELECT * FROM adoptant WHERE id = $1', [id]);
            return adoptant.rows;
        }
        catch(error){
            console.trace(error)
        }
    },


    correspondenceAdoptant: async (questionnaire) => {
        try {
            const adoptantCorresp = await db.query('SELECT * FROM adoptant WHERE email = $1 OR number_phone = $2', [questionnaire[0].email, questionnaire[0].number_phone]);
            return adoptantCorresp.rows[0];
        }
        catch(error){
            console.trace(error)
        }
    },

    petAdopt: async (petAttribut) => {
        try {
            const petAdopting = await db.query('UPDATE pet SET adopt = true, adoptant_id = $1 WHERE id = $2', [petAttribut.adoptant_id, petAttribut.pet_id ]);
            return petAdopting.rows[0];
        }catch(error){
            console.trace(error)
        }
    },

    findAllPetToAdoptant: async (id) => {
        try {
            const petAdopting = await db.query('SELECT * FROM pet WHERE adoptant_id = $1', [id]);
            return petAdopting.rows;
        }catch(error){
            console.trace(error)
        }
    },

    findAllCommentToAdoptant: async (id) => {
        try {
            const commentAdopting = await db.query('SELECT * FROM commentaire_adoptant WHERE  adoptant_id = $1', [id]);
            return commentAdopting.rows;
        }catch(error){
            console.trace(error)
        }
    },

    addCommentAdoptant: async (comment) => {
        try {
            console.log('je rentre dans mon model commentaire adooptant');
            const commentAdoptant = ('INSERT INTO commentaire_adoptant (adoptant_id, commentaire) VALUES ($1,$2) RETURNING *;');
            const data = await db.query(commentAdoptant, [
                comment.adoptant_id,
                comment.commentaire
            ])
            console.log('objet data',data);
            return data.rows;
        }catch(error) {
            console.trace(error)
        }
    },

    suppCommentAdoptant: async (id) => {
        try{
            const deleteCommentAdoptant = await db.query(`DELETE FROM commentaire_adoptant WHERE id = $1;`, [id]);
            return deleteCommentAdoptant;   
        }
        catch (error) {
            console.trace(error)
        }
    },

       

    //Ajouter un veterinaire
    addAdoptant: async (adoptant) => {
        try{
            const addAdoptant = `INSERT INTO adoptant ("number_id_passport", "lastname", "firstname", "birthday", "job","spouselastname", "spousefirstname", "spousebirthday", "spousejob", "postal_code", "number_phone", "number_phone2", "city", "email", "adress", "type_home", "fbpseudo", "numberadulthome", "numberchlidhome", "petcomposition", "black_list")
            VALUES ((SELECT pet.adoptant_id 
            FROM pet
            WHERE adoptant_id = $22 AND date_adopting = $23),$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)   
            RETURNING *;`;

            const data = await db.query(addAdoptant, [
                adoptant.number_id_passport,
                adoptant.lastname,
                adoptant.firstname,
                adoptant.birthday,
                adoptant.job,
                adoptant.spouselastname,
                adoptant.spousefirstname,
                adoptant.spousebirthday,
                adoptant.spousejob,
                adoptant.postal_code,
                adoptant.number_phone,
                adoptant.number_phone2,
                adoptant.city,
                adoptant.email,
                adoptant.adress,
                adoptant.type_home,
                adoptant.fbpseudo,
                adoptant.numberadulthome,
                adoptant.numberchlidhome,
                adoptant.petcomposition,
                adoptant.black_list,
                adoptant.adoptant_id,
                adoptant.date_adopting
            ]); 
            return data.rows[0];
        } catch (error) {
        console.trace(error);
        }
    },
}
module.exports = AdoptantModels;