const db = require("../database");


const Dashboard = {

    findNumberDogSupport: async() => {
        try{
            
            const petSupport = await db.query(`select date_supported, type from pet WHERE date_supported IS NOT NULL AND type = 'chien';`);
            return petSupport.rows
        }
        catch(error){
            console.trace(error)
        }   
    },
    findNumberCatSupport: async() => {
        try{
            
            const petSupport = await db.query(`select date_supported, type from pet WHERE date_supported IS NOT NULL AND type = 'chat';`);
            return petSupport.rows
        }
        catch(error){
            console.trace(error)
        }   
    },

    catRescue: async() => {
        try{
            
            const petSupport = await db.query(`select date_supported, adopt from pet WHERE date_supported IS NOT NULL AND adopt = true AND type = 'chat';`);
            return petSupport.rows
        }
        catch(error){
            console.trace(error)
        }   
    },

    dogRescue: async() => {
        try{
            
            const petSupport = await db.query(`select date_supported, adopt from pet WHERE date_supported IS NOT NULL AND adopt = true AND type = 'chien';`);
            return petSupport.rows
        }
        catch(error){
            console.trace(error)
        }   
    },

    newQuest: async() => {
        try{
            
            const petSupport = await db.query(`select id from questionnaire_adopt WHERE new = true;`);
            return petSupport.rows
        }
        catch(error){
            console.trace(error)
        }   
    },

}



module.exports = Dashboard;
