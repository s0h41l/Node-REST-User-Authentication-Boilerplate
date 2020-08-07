const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsSchema = Schema({
    title:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Skill',skillsSchema);