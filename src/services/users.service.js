const usersDao = require('../daos/users.dao');
const logger = require('../../util/logger');

const usersService = {
    get: (userId, callback) => {
        usersDao.get(userId, (error, users) => {
            if (error) return callback(error, undefined);
            if (users) return callback(undefined, users);
        });
    }, 
    update: (email, userId, callback) => {
        usersDao.update(email, userId, (error, result) => {
            if(error) return callback(error,undefined);
            if(result) return callback(undefined, result);
        });
    }, 
    delete: (userId, callback) => {
        usersDao.get(userId, (error, user) => {
            let user = users.filter((user) => user.id != userId);
            return callback(undefined, users);
        });
    }
};

module.exports = usersService;