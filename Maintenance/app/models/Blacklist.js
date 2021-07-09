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


    //route pour voir un blacklist
    findOneBlacklist: async (id) => {
        try {
            const blacklist = await db.query('SELECT * FROM blacklister WHERE id = $1', [id]);
            return blacklist.rows[0];
        }
        catch(error){
            console.trace(error)
        }
    },

    //route pour chercher dans la black liste
    controlBlackList: async (data) => {
        try {
            const blacklist = await db.query('SELECT * FROM blacklister WHERE number_phone = $1 OR email = $2 OR number_id_passport = $3 AND firstname = $5 OR lastname = $4 AND firstname = $5 AND postal_code = $6',[
                data.number_phone,
                data.email,
                data.number_id_passport,
                data.lastname,
                data.firstname,
                data.postal_code
            ]);
            return blacklist.rows[0];
        }
        catch(error){
            console.trace(error)
        }
    },

    addBlacklister: async (blacklist) => {
        console.log(blacklist);
        console.log(blacklist[0].number_id_passport);
        try {
            const addBlacklist = ('INSERT INTO blacklister (number_id_passport, lastname, firstname, postal_code, number_phone, city, email, adress, comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;');
            const data = await db.query(addBlacklist, [
                blacklist[0].number_id_passport,
                blacklist[0].lastname,
                blacklist[0].firstname,
                blacklist[0].postal_code,
                blacklist[0].number_phone,
                blacklist[0].city,
                blacklist[0].email,
                blacklist[0].adress,
                blacklist[0].comment
            ])
            
            return data.rows;
        }catch(error) {
            console.trace(error)
        }
    },

    black_list_FA: async (id) => {

        try {
            const black_list_FA = ('UPDATE host_family SET black_list = true, nolongercontact = true WHERE id = $1;');
            const data = await db.query(black_list_FA, [
                id
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
    },

    purifedFA: async (email) => {
        try{
            const deleteBlacklist = await db.query(`UPDATE host_family SET black_list = false, nolongercontact = false WHERE email = $1;`, [email]);
            return deleteBlacklist;   
        }
        catch (error) {
            console.trace(error)
        }
    },

    purifedAdoptant: async (email) => {
        try{
            const deleteBlacklist = await db.query(`UPDATE adoptant SET black_list = false, nolongercontact = false WHERE email = $1;`, [email]);
            return deleteBlacklist;   
        }
        catch (error) {
            console.trace(error)
        }
    }
}

module.exports = Blacklist;