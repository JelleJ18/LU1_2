const bcrypt = require('bcrypt');

const hash = {
    create: (password, callback) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if(err){
                return callback('bcrypt hashing failed', undefined);
            }
            return callback(undefined, hash);
        });
    },
    compare: (enteredPassword, hashedPassword, callback) => {
        bcrypt.compare(enteredPassword, hashedPassword, (err, resultCompare) => {
            if(err){
                return callback('bcrypt unhashing failed', undefined);
            }
            return callback(undefined, resultCompare)
        });
    }
}
module.exports = hash;