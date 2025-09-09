const data = require('../db/sql/example.data')
const database = require('../db/sql/connectiondb')

const usersDao ={
    get:(userId,callback)=>{
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
    update:(email,userId,callback)=>{
        database.query(
            'UPDATE ?? SET ?? = ? WHERE ?? = ?',
            ['customer', 'email', email, 'customer_id', userId],
            (error, results)=>{
                if(error) return callback(error, undefined);
                if(results) callback(undefined, results);
            }
        )
    },

    delete: ()=>{},
};

module.exports = usersDao;