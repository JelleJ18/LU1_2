const usersDao = require('../daos/users.dao');

const usersService = {
    get: (userId, callback) => {
        usersDao.get(userId, callback);
    }
};

module.exports = usersService;