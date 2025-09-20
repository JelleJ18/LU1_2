const { pool } = require('../db/sql/connectiondb');

const usersDao = {
  get: (userId, callback) => {
    pool.query(
      userId == undefined
      ? `SELECT * FROM ??`
      : `SELECT * FROM ?? WHERE ?? = ?`,
      userId == undefined ? ['customer'] : ['customer', 'customer_id', userId],
      (error, results) => {
        if(error) return callback(error, undefined);
        if(results) return callback(undefined, results);
      }
    );
  },

  update: (email, userId, firstName, lastName, active, callback) => {
    pool.query(
      'UPDATE customer SET email = ?, first_name = ?, last_name = ?, active = ? WHERE customer_id = ?',
      [email, firstName, lastName, active, userId],
      (error, results) => {
        if (error) return callback(error, undefined);
        return callback(undefined, results);
      }
    );
  },

  delete: (userId, callback) => {
    pool.query('DELETE FROM payment WHERE customer_id = ?', [userId], (error) => {
        if (error) return callback(error);
        pool.query('DELETE FROM rental WHERE customer_id = ?', [userId], (error) => {
            if (error) return callback(error);
            pool.query('DELETE FROM customer WHERE customer_id = ?', [userId], (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            });
        });
    });
},

  create: (store_id, firstName, lastName, email, address_id, password, active, callback) => {
    pool.query(
        'INSERT INTO customer (store_id, first_name, last_name, email, address_id, password, active, create_date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
        [store_id, firstName, lastName, email, address_id, password, active],
        (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        }
    );
},
};

module.exports = usersDao;