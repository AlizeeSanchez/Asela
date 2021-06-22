const db = require("../database");

const Cat = {

    //On recupere les chats a l'adoption
    findCatNotAdopted: async () => {
        try{
            const cats = await db.query("SELECT * FROM pet WHERE adopt = false AND deceased = false AND type = 'chat' ORDER BY id;");   
            return cats.rows;
        }catch (error){
            console.trace(error);
        }
    },
    
    //On recupere les chats adoptés
    findCatAdopted: async () => {
        try{
            const pets = await db.query(
            "SELECT pet.id, pet.name, pet.breed, pet.last_name_pet, pet.age, pet.sexe, adoptant.lastname, adoptant.firstname, adoptant.number_phone, adoptant.city,adoptant.postal_code, adoptant.adress FROM pet JOIN adoptant ON pet.adoptant_id = adoptant.id WHERE pet.adopt = true AND pet.type = 'chat';"
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

    findOneCat: async (id) => {
        try{
            const cat = await db.query("SELECT * FROM pet WHERE id = $1 ORDER BY id;", [id]);
            return cat.rows[0]
        }catch (error){
            console.trace(error);
        }
    },

    //On passe l'adoption a true quand un chat viens d'être adopté
    adoptCatIsTrue: async (id) => {
        try{
            const editCat = await db.query(`UPDATE pet SET adopt = true WHERE id = $1 AND type = 'chat';`, [id])
            return editCat.rows;
        }
        catch(error){
            console.trace(error)
        }
    },


    //On passe l'adoption a false si un chat est de retour d'adoption
    adoptCatIsFalse: async (id) => {
        try{
            const editCat = await db.query(`UPDATE pet SET adopt = false WHERE id = $1 AND type = 'chat';`, [id])
            return editCat.rows;
        }
        catch(error){
            console.trace(error)
        }

    },

    //Ajouter un chat a l'adoption
    addNewCat: async (cat) => {       
        try{
            const addCat = `INSERT INTO pet ("type", "name", "age", "amity", "sexe", "color", "ide", "sterilised", "description", "breed") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
            const data = await db.query(addCat, [
                cat.type,
                cat.name,
                cat.age,
                cat.amity,
                cat.sexe,
                cat.color,
                cat.ide,
                cat.sterilised,
                cat.description, 
                cat.race
            ]); 
            console.log('Je suis arriver en fin de requete');
            
            return data.rows[0];
        } catch (error) {
        console.trace(error);
        }
    },
    
    //Supprimer un chat a l'adoption
    suppCat: async (id) => {
        try{
            const cat = await db.query(`DELETE FROM pet WHERE type = 'chat' AND id = $1;`, [id]);
            return cat;   
        }
        catch (error) {
            console.trace(error)
        }
    },

    findAllCatDeceaded: async () => {
        try{
            const pets = await db.query(
                "SELECT * FROM pet WHERE deceased = true AND type = 'chat' ORDER BY id;"
            );
            return pets.rows;
        }catch (error){
            console.trace(error);
        }
    },

};

module.exports = Cat;