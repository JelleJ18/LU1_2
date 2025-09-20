const filmsService = require('../services/films.service');

const filmsController = {
    list: (req, res, next) => {
        const onlyAvailable = req.query.available === '1';
        const search = req.query.search || '';
        const genre = req.query.genre || '';
        const sort = req.query.sort || 'title';

        filmsService.getAllWithAvailability(search, genre, sort, (err, films) => {
            if (err) return next(err);
            let filtered = films;
            if (onlyAvailable) {
                filtered = films.filter(f => f.available > 0);
            }
            filmsService.getGenres((err, genres) => {
                if (err) return next(err);
                res.render('films/list', { films: filtered, query: req.query, genres });
            });
        });
    },

    details: (req, res, next) => {
        const filmId = req.params.filmId;
        filmsService.getById(filmId, (err, film) => {
            if (err) return next(err);
            if (!film) return res.status(404).render('error', { message: 'Film not found', error: {} });
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