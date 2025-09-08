const data = require('../db/sql/example.data')
const database = require('../db/sql/connection')

const usersDao ={
    get:(userId,callback)=>{
        // let dbstring = 'SELECT * FROM customer'
        // if(userId) dbstring += ' WHERE customer_id = '+userId;
        database.query(
            userId == undefined
            ? 'SELECT * FROM ??'
            : 'SELECT * FROM ?? WHERE ?? = ?',
            userId == undefined
            ?['customer']
            :['customer','customer_id',userId],
            (error,results)=>{
                if(error) return callback(error,undefined);
                if(results) return callback(undefined,results);
        });
    },
    delete: ()=>{},
};

module.exports = usersDao;