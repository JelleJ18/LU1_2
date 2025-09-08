const data = require('../db/sql/example.data');
const database = require('../db/sql/connection.db');

const usersDao ={
    get:(userId, callback)=>{
        if(userId === undefined){
            ? 'SELECT * FROM ??'
            : 'SELECT * FROM ?? WHERE ?? = ?';
        }
        else{
            let user = data.filter(user=> user.id == userId)[0];
            return callback(undefined, user);
        }
    }
}