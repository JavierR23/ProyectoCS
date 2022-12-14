const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const Cuentas = new Schema({
    username: {type: String, requeried: true, unique: true},
    password: {type: String, requeried: true}
});

Cuentas.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;

        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) =>{
            if(err){
                next(err);
            }
            else
            {
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

Cuentas.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        }
        else{
            callback(err, same)
        }
    });
}

module.exports = mongoose.model('cuentas', Cuentas);