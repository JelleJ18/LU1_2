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
    getAllWithAvailability: (search, genre, sort, callback) => {
        let sql = `
            SELECT f.film_id, f.title, f.description, f.release_year,
                (
                    SELECT COUNT(*) FROM inventory i
                    WHERE i.film_id = f.film_id
                    AND i.inventory_id NOT IN (
                        SELECT r.inventory_id FROM rental r WHERE r.return_date IS NULL
                    )
                ) AS available
            FROM film f
            LEFT JOIN film_category fc ON f.film_id = fc.film_id
            LEFT JOIN category c ON fc.category_id = c.category_id
            WHERE 1=1
        `;
        const params = [];

        if (search) {
            sql += ' AND f.title LIKE ?';
            params.push(`%${search}%`);
        }
        if (genre) {
            sql += ' AND c.name = ?';
            params.push(genre);
        }
        if (sort === 'title') {
            sql += ' ORDER BY f.title';
        } else if (sort === 'release_year') {
            sql += ' ORDER BY f.release_year DESC';
        } else {
            sql += ' ORDER BY f.title';
        }

        pool.query(sql, params, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getGenres: (callback) => {
        pool.query('SELECT DISTINCT name FROM category ORDER BY name', (err, results) => {
            if (err) return callback(err);
            callback(null, results.map(r => r.name));
        });
    },
};

module.exports = filmsDao;