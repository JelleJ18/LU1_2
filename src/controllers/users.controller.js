const usersService = require('../services/users.service');
const logger = require('../../util/logger');

const usersController = {
    validate:(req, res, next) => {
        let userId = req.params.userId;
        let {email, firstName, lastName, active} = req.body;
        active = parseInt(active);
        next()
    },
    get: (req, res, next) => {
        let userId = req.params.userId;
        usersService.get(userId, (error, user) => {
            if (error) return next(error);
            if (userId) {
                res.render('users/details', { users: user });
            } else {
                res.render('users/table', { users: user });
            }
        });
    },
    update: (req, res, next) => {
        let userId = req.params.userId;
        let { email, firstName, lastName, active } = req.body;
        logger.debug(active);
        req.method == 'GET'
        ? usersService.get(userId, (error, users) => {
            if (error) next(error);
            if (users) res.render('users/edit', { users: users[0] });
        })
        : usersService.update(email, userId, firstName, lastName, active, (error, result) => {
            if (error) next(error);
            if (result) res.redirect(301, `/users/${userId}/details`);
            //POP_UP Toevoegen voor confirmation
        });
    },
    delete: (req, res, next) => {
        let userId = req.params.userId;
        usersService.delete(userId, (error, result) => {
            if (error) return next(error);
            res.json({
                status: 200,
                message: `User succesvol verwijderd`,
                data: result,
            });
        });
    }
};

module.exports = usersController;