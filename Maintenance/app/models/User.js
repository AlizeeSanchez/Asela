const db = require('../database');

const User = {

    findAllUser: async () => {
        try {
            const users = await db.query('SELECT id, lastname, firstname, number, mail, admin FROM "volunteer"');
            return users.rows;
        }
        catch (error) {
            console.trace(error)
        }
    },

    findOneUser: async (id) => {
        try {
            const users = await db.query('SELECT id, lastname, firstname, number, mail, admin, adress, postal_code, city FROM "volunteer" WHERE id = $1', [id]);
            return users.rows;
        }
        catch (error) {
            console.trace(error)
        }
    },

    addUser: async (id) => {
        console.log('model adduser');

        try {
            const users = await db.query('UPDATE volunteer SET admin = true WHERE id = $1', [id]);
            return users.rows;
        }
        catch (error) {
            console.trace(error)
        }
    },

    delUser: async (id) => {
        console.log('dell adduser');

        try {
            const users = await db.query('DELETE FROM volunteer WHERE id = $1', [id]);
            return users.rows;
        }
        catch (error) {
            console.trace(error)
        }
    },

    signIn: async (user) => {
        console.log('Je suis dans le model');
        
        try {
            const sql = `INSERT INTO volunteer ("lastname", "firstname", "number", "adress", "postal_code", "city", "mail", "password") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`;
            const data = await db.query(sql, [user.lastname, user.firstname, user.number_phone, user.adress, user.postal_code, user.city, user.email, user.password]);
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

    getMemberById: async (id) => {
        const userViaId = await db.query(`SELECT * FROM volunteer WHERE id = $1;`, [id]);
        return userViaId.rows[0];
    },

    editUser: async (body) => {
        console.log('dans mon model', body);
        try {
            const users = await db.query('UPDATE volunteer SET number = $1, mail = $2, adress = $3, city = $4, postal_code = $5 WHERE id = $6', [
                body.number,
                body.mail,
                body.adress,
                body.city,
                body.postal_code,
                body.id
            ]);
            return users.rows;
        }
        catch (error) {
            console.trace(error)
        }
    },

    newPassword: async (body) => {
        console.log('dans mon model', body);
        try {
            const users = await db.query('UPDATE volunteer SET password = $1 WHERE id = $2', [
                body.password,
                body.id
            ]);
            return users.rows;
        }
        catch (error) {
            console.trace(error)
        }
    },
}

module.exports = User;