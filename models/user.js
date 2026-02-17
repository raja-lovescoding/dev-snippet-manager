const pool = require('../config/db.pg');

const user ={
    findByemail: async (email) => {
        try {
            const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return res.rows[0];
        } catch (err) {
            console.error('Error fetching user by email:', err);
            throw err;
        }
    },
    create: async (email, passwordHash) => {
        try {
            const res = await pool.query(
                'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
                [email, passwordHash]
            );
            return res.rows[0];
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    }, 
    findById: async (id) => {
        try {
            const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return res.rows[0];
        } catch (err) {
            console.error('Error fetching user by ID:', err);
            throw err;
        }
}
};

module.exports = user;