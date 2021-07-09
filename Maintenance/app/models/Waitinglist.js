const db = require("../database");

const Waitinglist = {


    //On recupere questionnaire chat en liste d'attente
    findAllWaitingCat: async () => {
        try{
            const cats = await db.query(`SELECT * FROM questionnaire_adopt WHERE status = 'Liste d''attente' AND type_pet = 'Chat' ;`);   
            return cats.rows;
        }catch (error){
            console.trace(error);
        }
    },
    
    //On recupere questionnaire chien en liste d'attente
    findAllWaitingDog: async () => {
        try{
            const dogs = await db.query(`SELECT * FROM questionnaire_adopt WHERE status = 'Liste d''attente' AND type_pet = 'Chien';`);  
            return dogs.rows;
        }catch (error){
            console.trace(error);
        }
    },

     //Ajouter un veterinaire
    // findAllWaitingDog: async () => {
    //    try{
    //        const dogs = `SELECT * FROM questionnaire_adopt WHERE status = 'Liste d''attente' AND type_pet = 'Chien';`;
    //        const data = await db.query(dogs); 
    //        return data.rows[0];
    //    } catch (error) {
    //    console.trace(error);
    //    }
    //},

}

module.exports = Waitinglist;