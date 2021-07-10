const db = require("../database");

const Other = {

    //Lister les evenements
    allEvent: async () => {
        try{
            const events = await db.query(
                "SELECT * FROM event ORDER BY id;"
         );
            return events.rows;
        }catch (error){
            console.trace(error);
        }
    },

    findRate: async () => {
        try{
            const events = await db.query(
                "SELECT * FROM price_adopt;"
         );
            return events.rows;
        }catch (error){
            console.trace(error);
        }
    },

    purebred_pet: async () => {
        try{
            const events = await db.query(
                "SELECT * FROM purebred_pet;"
         );
            return events.rows;
        }catch (error){
            console.trace(error);
        }
    },

    allConditions: async () => {
        try{
            const events = await db.query(
                "SELECT * FROM condition_adopt;"
         );
            return events.rows;
        }catch (error){
            console.trace(error);
        }
    },
    
}

module.exports = Other;