const { pool } = require('../db/sql/connectiondb');

const usersDao = {
  get: (userId, callback) => {
    let query, params;

    if (userId == undefined) {
      query = 'SELECT * FROM ??';
      params = ['customer'];
    } else {
      query = 'SELECT * FROM ?? WHERE ??= ?';
      params = ['customer', 'customer_id', userId];
    }
    pool.query(query, params, (error, results) => {
      if (error) return callback(error, undefined);
      if (results) return callback(undefined, results);
    });
  },

  update: (email, userId, firstName, lastName, active, callback) => {
    pool.query(
      'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?',
      ['customer', 'email', email, 'first_name', firstName, 'last_name', lastName, 'active', active, 'customer_id', userId],
      (error, results) => {
        if (error) return callback(error, undefined);
        if (results) return callback(undefined, results);
      }
    )
  },

  delete: (userId, callback) => {
    pool.query(
      'DELETE FROM customer WHERE customer_id = ?',
      [userId],
      (error, results) => {
        if (error) return callback(error, undefined);
        return callback(undefined, results);
      }
    );
  },
};

module.exports = usersDao;