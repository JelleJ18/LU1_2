const usersDao = require('../daos/users.dao');
const logger = require('../../util/logger');
const {expect} = require('chai');

const usersService = {
  validate:(email, firstName, lastName, active, callback)=>{
        try {
            expect(firstName).to.be.a('string', 'FirstName should be a string');
            expect(lastName).to.be.a('string', 'LastName should be a string');
            expect(email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email should be valid');
            expect(parseInt(active)).to.be.a('number', 'Active should be a number.')

            callback(undefined);
        } catch (error) {
            callback(error);
        }
    },
  get: (userID, callback) => {
    usersDao.get(userID, (error, users) => {
      if (error) return callback(error, undefined);
      if (users)
        return callback(undefined, users);
      logger.debug(users);

    });
  },

  update: (email, userId, firstName, lastName, active, callback) => {
    usersDao.update(email, userId, firstName, lastName, active, (error, result) => {
      if (error) return callback(error, undefined);
      if (result) return callback(undefined, result);
    });
  },

  delete: (userId, callback) => {
    usersDao.get(undefined, (error, result) => {
        if (error) return callback(error);
        // Verwijder de user met het opgegeven id
        let filtered = result.filter(u => u.id != userId);
        return callback(undefined, filtered);
    });
  }
}

module.exports = usersService;