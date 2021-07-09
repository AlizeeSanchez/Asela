const db = require('../database');

const Home = {

    //recuperation du chat disponible à l'adoption depuis le plus longtemps ( cf date de prise en charge )
    findStarCat: async() => {
        try{
            const oldCat = await db.query(`SELECT * FROM pet WHERE type = 'chat' AND adopt = false AND date_supported IS NOT NULL ORDER BY date_supported LIMIT (1);`);
            return oldCat.rows
        }
        catch(error){
            console.trace(error)
        }
    },

    //recuperation du chien disponible à l'adoption depuis le plus longtemps ( cf date de prise en charge )
    findStarDog: async() => {
        try{
            const oldDog = await db.query(`SELECT * FROM pet WHERE type = 'chien' AND adopt = false AND date_supported IS NOT NULL ORDER BY date_supported LIMIT (1);`);
            return oldDog.rows
        }
        catch(error){
            console.trace(error)
        }   
    },

    //recuperation du nombre de chiens pris en charge l'an dernier
    findNumberDogSupport: async() => {
        try{
            
            const dogSupport = await db.query(`select date_supported from pet WHERE date_supported IS NOT NULL AND type = 'chien';`);
            return dogSupport.rows
        }
        catch(error){
            console.trace(error)
        }   
    },
    
    //recuperation du nombre de chiens pris en charge cette année
    findNumberCatSupport: async() => {
        try{
            const catSupport = await db.query(`select date_supported from pet WHERE date_supported IS NOT NULL AND type = 'chat';`);
            return catSupport.rows
        }
        catch(error){
            console.trace(error)
        }   
    }
}

module.exports = Home;