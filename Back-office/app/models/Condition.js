const db = require("../database");


const Condition = {

    // Lister les conditions d'adoption
    findCondition: async () => {
        try{
            const condition = await db.query(
                "SELECT * FROM condition_adopt ORDER BY id;"
         );
            return condition.rows;
        }catch (error){
            console.trace(error);
        }
    },

    //Afficher une condition
    findOneCondition: async (id) => {
        try{
            const condition = await db.query(
                "SELECT * FROM condition_adopt WHERE id = $1 ORDER BY id;", [id]
            );
            console.log(condition);
            return condition.rows[0];
        } catch (error){
            console.trace(error);
        }
    },

    //Ajouter une condition d'adoption
    addNewCondition: async (condition) => {
        try{
        const addCondition = `INSERT INTO condition_adopt ("description") VALUES ( $1) RETURNING *;`;
        const data = await db.query(addCondition, [

            condition.description,

        ]);
        console.log("monconsole log add condition :", condition);
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    },

    //Modifier une condition d'adoption
    editCondition: async (condition) => {
        console.log('dans mon model:', condition)
        console.log('dans mon model:', condition.id)

        try{
            const editCondition = await db.query(`UPDATE condition_adopt SET description = $1 WHERE id = $2;`, [condition.description, condition.id]);
            return editCondition;
        }
        catch(error){
            console.trace(error)
        }

    },

    //Supprimer une condition d'adoption
    suppCondition: async (condition) => {
        try{
        const suppCondition = await db.query('DELETE FROM condition_adopt WHERE id = $1;',[condition])
        }
        catch (error) {
            console.trace(error);
        }
        
    }



}

module.exports = Condition;