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
    console.log('Verwijder userId:', userId);
    pool.query(
      'DELETE FROM customer WHERE customer_id = ?',
      [userId],
      (error, results) => {
        console.log('Delete error:', error);
        console.log('Delete results:', results);
        if (error) return callback(error, undefined);
        return callback(undefined, results);
      }
    );
  },

  create: (email, firstName, lastName, password, callback) => {
    pool.query(
        'INSERT INTO customer (email, first_name, last_name, password, active, store_id, create_date) VALUES (?, ?, ?, ?, 1, 1, NOW())',
        [email, firstName, lastName, password],
        (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        }
    );
},
};

module.exports = usersDao;