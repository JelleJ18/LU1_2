const { pool } = require('../db/sql/connectiondb');
const authDao = {
    login:(email, callback) => {
        pool.query(
            'SELECT email, password, customer_id, first_name FROM customer WHERE email = ?',
            [email],
            (error, results) => {
                if(error) return callback(error, undefined);
                return callback(undefined, results);
            }
        );
    },
};

module.exports = authDao;