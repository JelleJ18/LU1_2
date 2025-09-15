const authController = {
    validate:(req, res, next)=>{},
    login:(req,res, next) => {},
    logout: (req, res, next) => {
        req.session.destroy(() => {
            res.redirect('/auth/login');
        });
    },
    isLoggedIn: (req, res, next) => {
        if(req.session.user) return next();
        const error = new Error('You must log in.');
        next(error);
    }
}