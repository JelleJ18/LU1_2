const authDao = require('../daos/auth.dao');
const hash = require('../../util/hash');

const authService = {
    login: (email, password, callback) => {
        authDao.login(email, (error, users) => {
            if (error) return callback(error, undefined);
            if (!users || users.length === 0) return callback(null, false);

            hash.compare(password, users[0].password, (err, isMatch) => {
                if (err) return callback(err);
                if (!isMatch) return callback(null, false);
                return callback(null, users[0]);
            });
        });
    },
};

module.exports = authService;