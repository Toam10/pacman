const mongoose = require('mongoose');


const user = new mongoose.Schema({
    username        : 
                     {
                        type: String,
                        required: true
                     },
    password        : 
                     {
                        type: String,
                        required: true
                     },
    score           :
                     {
                        type: Number,
                     }
});

const User = mongoose.model('users', user);


module.exports = { User };