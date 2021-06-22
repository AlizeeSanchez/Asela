const db = require("../database");

const Blacklist = {

    //route pour afficher tous nos blacklister
    findAllBlacklist: async () => {
        try {
            const blacklists = await db.query('SELECT * FROM blacklister');
            return blacklists.rows;
        }
        catch(error){
            console.trace(error)
        }
    },


    //route pour voir un adoptant
    findOneBlacklist: async (id) => {
        try {
            const blacklist = await db.query('SELECT * FROM blacklister WHERE id = $1', [id]);
            return blacklist.rows[0];
        }
        catch(error){
            console.trace(error)
        }
    },

    addBlacklister: async (blacklist) => {
        try {
            const addBlacklist = ('INSERT INTO blacklister (number_id_passport, lastname, firstname, postal_code, number_phone, city, email, adress, comment, "date") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;');
            const data = await db.query(addBlacklist, [
                blacklist.number_id_passport,
                blacklist.lastname,
                blacklist.firstname,
                blacklist.postal_code,
                blacklist.number_phone,
                blacklist.city,
                blacklist.email,
                blacklist.adress,
                blacklist.comment,
                blacklist.date
            ])
            return data.rows;
        }catch(error) {
            console.trace(error)
        }
    },

    suppBlacklister: async (id) => {
        try{
            const deleteBlacklist = await db.query(`DELETE FROM blacklister WHERE id = $1;`, [id]);
            return deleteBlacklist;   
        }
        catch (error) {
            console.trace(error)
        }
    }
}

module.exports = Blacklist;