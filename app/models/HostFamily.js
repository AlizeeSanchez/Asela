const db = require("../database");

const HostFamily = {

    //On recupere les familles d'acceuils
    findAllHostFamily: async () => {
        try{
            const hostFamily = await db.query("SELECT * FROM host_family;");   
            return hostFamily.rows;
        }catch (error){
            console.trace(error);
        }
    },

    findOneHostFamily: async (id) => {
        try{
            const hostFamily = await db.query("SELECT * FROM host_family WHERE id = $1", [id]);
            return hostFamily.rows
        }catch (error){
            console.trace(error);
        }
    },
}

module.exports = HostFamily;