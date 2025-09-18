const { pool } = require('../db/sql/connectiondb');

const filmsDao = {
    get: (callback) => {
        pool.query(`SELECT film_id, title FROM film`, (err, results) => {
            if(err) return callback(err);
            callback(null, results);
        });
    },
    getById: (filmId, callback) =>{
        pool.query(`SELECT film_id, title, description, release_year FROM film WHERE film_id = ?`,
            [filmId],
            (err, results) => {
                if(err) return callback(err);
                callback(null, results[0]);
            }
        );
    },
    getByCustomer: (customerId, callback) => {
        pool.query(
            `SELECT DISTINCT f.film_id, f.title, f.description, f.release_year
             FROM rental r
             JOIN inventory i ON r.inventory_id = i.inventory_id
             JOIN film f ON i.film_id = f.film_id
             WHERE r.customer_id = ?`,
            [customerId],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    },
    getActors: (filmId, callback) => {
        pool.query(
            `SELECT a.actor_id, a.first_name, a.last_name
             FROM actor a
             JOIN film_actor fa ON a.actor_id = fa.actor_id
             WHERE fa.film_id = ?`,
            [filmId],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    },
    getAvailability: (filmId, callback) => {
        pool.query(
            `SELECT COUNT(*) AS available
             FROM inventory i
             WHERE i.film_id = ?
             AND i.inventory_id NOT IN (
               SELECT r.inventory_id
               FROM rental r
               WHERE r.return_date IS NULL
             )`,
            [filmId],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results[0].available);
            }
        );
    },
    getAllWithAvailability: (callback) => {
        pool.query(
            `SELECT f.film_id, f.title, f.description, f.release_year,
                (
                    SELECT COUNT(*) FROM inventory i
                    WHERE i.film_id = f.film_id
                    AND i.inventory_id NOT IN (
                        SELECT r.inventory_id FROM rental r WHERE r.return_date IS NULL
                    )
                ) AS available
             FROM film f`,
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    },
};

module.exports = filmsDao;