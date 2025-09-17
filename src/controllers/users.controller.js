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
                res.render('users/details', { users: user[0] });
            } else {
                res.render('users/table', { users: user });
            }
        });
    },
    update: (req, res, next) => {
        if (req.method === 'GET') {
            let userId = req.params.userId;
            usersService.get(userId, (error, user) => {
                if (error) return next(error);
                res.render('users/edit', { user: user[0] }); 
            });
        } else if (req.method === 'POST') {
            let userId = req.params.userId;
            let { email, firstName, lastName, active } = req.body;
            usersService.update(email, userId, firstName, lastName, active, (error, result) => {
                if (error) return next(error);
                res.redirect(`/users/${userId}/details`);
            });
        }
    },
    delete: (req, res, next) => {
        let userId = req.params.userId;
        usersService.delete(userId, (error, result) => {
            if (error) {
                console.log('Delete controller error:', error);
                return next(error);
            }
            res.json({
                status: 200,
                message: `User succesvol verwijderd`,
                data: result,
            });
        });
    }
};

module.exports = usersController;