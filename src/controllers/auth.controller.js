const authService = require('../services/auth.service');

const authController = {
    login: (req, res, next) => {
        if (req.method === 'GET') {
            return res.render('auth/login');
        }
        next();
    },

    validate: (req, res, next) => {
        const { email, password } = req.body;
        authService.login(email, password, (error, user) => {
            if (error) return res.render('auth/login', { error: 'Something went wrong!' });
            if (!user) return res.render('auth/login', { error: 'Wrong email or password!' });
            req.session.user = user;
            res.redirect('/users/account');
        });
    },

    logout: (req, res, next) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    },

    isLoggedIn: (req, res, next) => {
        if (req.session.user) return next();
        return res.redirect('/auth/login');
    }
};

module.exports = authController;