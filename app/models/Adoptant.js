const db = require("../database");


const AdoptantModels = {

    //route pour check dans les questionnaires
    findAllAdoptant: async () => {
        try {
            const adoptants = await db.query('SELECT * FROM adoptant');
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
            console.log[petAttribut.adoptant_id, petAttribut.pet_id]
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
            const commentAdoptant = ('INSERT INTO commentaire_adoptant (adoptant_id, commentaire) VALUES ($1,$2) RETURNING *;');
            const data = await db.query(commentAdoptant, [
                comment.id,
                comment.commentaire
            ])
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
    }



}
module.exports = AdoptantModels;