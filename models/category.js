const mongoose = require("mongoose");


//Category schema
const CategorySchema = mongoose.Schema({
    name:{
        type: String,
    },
    slug:{
        type:String,
    },
});

const Category = (module.exports = mongoose.model("Category", CategorySchema));