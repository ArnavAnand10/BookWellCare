const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
    username : {
        type: String,
    },
    fullname:{
        type: String,

    },

    email:{
        type: String,
    },
    password:{
        type:String,
    },
    phone:{
        type: String,
    }
})

const Users = mongoose.model("user",registerSchema);

module.exports = Users;