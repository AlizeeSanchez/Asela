const db = require("../database");

const Cat = {

    //On recupere les chats a l'adoption
    findCatNotAdopted: async () => {
        try{
            const cats = await db.query(
                "SELECT * FROM pet WHERE adopt = $1 AND type = $2;");
            return cats.rows;
        }catch (error){
            console.trace(error);
        }
    },
    
    //On recupere les chats adoptés
    findCatAdopted: async () => {
        try{
            const cats = await db.query(
                "SELECT * FROM pet WHERE adopt = $1 AND type = $2;");
            return cats.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //On passe l'adoption a true quand un chat est adopté
    adoptIsTrue: async () => {
        try{

        }
        catch(error){

        }

    }

    //On passe l'adoption a false si un retour d'adoption

    //Ajouter un chien a l'adoption

    //Supprimer un chien a l'adoption

    //Afficher un chien

    //Modifier un chien

    //Rechercher un chien par son nom ou par son IDE

};

module.exports = Cat;