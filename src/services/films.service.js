const filmsDao = require('../daos/films.dao');

const filmsService = {
    get: (callback) => {
        filmsDao.get(callback);
    },
    getById:(filmId, callback) => {
        filmsDao.getById(filmId, callback);
    },
    getByCustomer: (customerId, callback) => {
        filmsDao.getByCustomer(customerId, callback);
    },
    getActors:(filmdId, callback) =>{
        filmsDao.getActors(filmdId, callback);
    },
    getAvailability: (filmId, callback) => {
        filmsDao.getAvailability(filmId, callback);
    },
    getAllWithAvailability: (callback) => {
        filmsDao.getAllWithAvailability(callback);
    },
};

module.exports = filmsService;