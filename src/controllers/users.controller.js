const usersService = require('../services/users.service');
const logger = require('../../util/logger');
const hash = require('../../util/hash'); // bovenaan toevoegen

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
                res.render('users/account', { users: user[0] });
            }
        });
    },
    registerForm: (req, res) => {
        res.render('users/register');
    },
    create: (req, res, next) => {
        const { email, firstName, lastName, password} = req.body;
        const store_id = 1; 
        const active = 1;
        const address_id = 5;
        hash.create(password, (err, hashedPassword) => {
            if (err) return next(err);
            usersService.create(store_id, firstName, lastName, email, address_id, hashedPassword, active, (error, result) => {
                if (error) return next(error);
                res.redirect('/auth/login');
            });
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
                res.redirect(`/users/account`);
            });
        }
    },
    delete: (req, res, next) => {
        let userId = req.session.user.customer_id;
        usersService.delete(userId, (error, result) => {
            if (error) {
                console.log('Delete controller error:', error);
                return next(error);
            }
            req.session.destroy(() => {
                res.redirect('/auth/login')
            });
        });
    },
    account: (req, res, next) => {
        const userId = req.session.user.customer_id;
        usersService.get(userId, (error, user) => {
            if (error) return next(error);
            if (!user || user.length === 0) return res.status(404).render('error', { message: 'Gebruiker niet gevonden', error: {} });
            res.render('users/account', { users: user[0] });
        });
    },
    details: (req, res, next) => {
        const filmId = req.params.filmId;
        filmsService.getById(filmId, (err, film) => {
            if (err) return next(err);
            if (!film) return res.status(404).render('error', { message: 'Film niet gevonden', error: {} });
            filmsService.getActors(filmId, (err, actors) => {
                if (err) return next(err);
                filmsService.getAvailability(filmId, (err, available) => {
                    if (err) return next(err);
                    res.render('films/details', { film, actors, available });
                });
            });
        });
    },
};

module.exports = usersController;