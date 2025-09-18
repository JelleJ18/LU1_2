const filmsService = require('../services/films.service');

const filmsController = {
    list: (req, res, next) => {
        const onlyAvailable = req.query.available === '1';
        filmsService.getAllWithAvailability((err, films) => {
            if (err) return next(err);
            let filtered = films;
            if (onlyAvailable) {
                filtered = films.filter(f => f.available > 0);
            }
            res.render('films/list', { films: filtered, query: req.query });
        });
    },

    details: (req, res, next) => {
        const filmId = req.params.filmId;
        filmsService.getById(filmId, (err, film) => {
            if (err) return next(err);
            if (!film) return res.status(404).render('error', { message: 'Film niet gevonden', error: {} });
            filmsService.getActors(filmId, (err, actors) => {
                if (err) return next(err);
                res.render('films/details', { film, actors });
            });
        });
    },

    rentedByUser: (req, res, next) => {
        const customerId = req.session.user.customer_id;
        filmsService.getByCustomer(customerId, (err, films) => {
            if (err) return next(err);
            res.render('users/rentals', { films });
        });
    },
};

module.exports = filmsController;