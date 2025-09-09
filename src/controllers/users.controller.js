const usersService = require('../services/users.service');
const logger = require('../../util/logger');

const usersController = {
    get: (req, res, next) => {

    },
    update: (req, res, next) => {
        let userId = req.params.userId;
        let { email } = req.body;
        req.method == 'GET'
        ? usersService.get(userId, (error, users) => {
            if (error) next(error);
            if (users) res.render('users/edit', { users: users[0] });
        })
        : usersService.update(email, userId, (error, result) => {
            if (error) next(error);
            if (result) res.redirect(301, `/users/${userId}/details`);
            //POP_UP Toevoegen voor confirmation
        });
    },
    delete: (req, res, next) => {
        let userId = req.params.userId;
        usersService.delete(userId, (error, users) => {
            if (error) next(error);
            if (users) res.render('users', { users: users });
        });
    }
};

module.exports = usersController;