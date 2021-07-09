const db = require('../database');

const User = {

    findAllUser: async () => {
        try {
            const users = await db.query('SELECT * FROM "volunteer"');
            return users.rows;
        }
        catch (error) {
            console.trace(error)
        }
    },

    signIn: async (user) => {
        console.log('Je suis dans le model');
        
        try {
            const sql = `INSERT INTO volunteer ("lastname", "firstname", "number","mail", "password") VALUES ($1,$2,$3,$4,$5) RETURNING id`;
            const data = await db.query(sql, [user.lastname, user.firstname, user.number_phone, user.email, user.password]);
            return data.rows[0], success = true ;   
        }
        catch (error) {
            console.trace(error)
        }
    },

    getMemberByEmail: async (mail) => {
        const userViaMail = await db.query(`SELECT * FROM volunteer WHERE mail = $1;`, [mail]);
        return userViaMail.rows[0];
    },
}

module.exports = User;