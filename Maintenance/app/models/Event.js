const db = require("../database");

const Event = {

    

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

    //Ajouter evenement
    addNewEvent: async (event) => {
        try{
        const addEvent = `INSERT INTO event ("title", "location", "date_event", "content", "picture") VALUES ( $1, $2, $3, $4, $5) RETURNING *;`;
        const data = await db.query(addEvent, [

        event.title,
        event.location,
        event.date_event,
        event.content,
        event.picture

        ]);
        console.log("monconsole log add event :", addEvent);
        return data.rows[0];
        }   
        catch (error) {
            console.trace(error);
        }
    },

    //Supprimer un event
    suppEvent: async (event) => {
        try{
        const suppEvent = await db.query('DELETE FROM event WHERE id = $1;',[event])
        }
        catch (error) {
            console.trace(error);
        }
        
    },

    findOneEvent: async (id) => {
        try{
            const event = await db.query('select * from event where id = $1;', [id])
            return event.rows[0];
        }
        catch (error) {
            console.trace(error);
        }
    }

}

module.exports = Event;