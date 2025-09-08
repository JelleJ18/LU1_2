const usersService = require('../services/users.service');

const usersController={
    get:(req, res, next)=>{
        let userId = req.params.userId;
        usersService.get(userId, (error, user)=>{
            if(error) next(error);
            if(users){
                res.render('users/table', {users : users});
            }
        });
    },
    delete:(req, res, next)=>{
        let userId = req.params.userId;
        usersService.delete(userId, (error, users)=>{
            if(error) next(error);
            if(users){
                res.render('users', {users : users});
            }
        });
    }
}

module.exports=usersController;