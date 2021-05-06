const express = require("express");
const router = express.Router();

const Category = require("../models/category");

//Get /categories
router.get("/", (req,res)=>{
    Category.find({},(error,categories)=>{
        if(error) console.log(error);
        res.json(categories);
    });
});

module.exports = router;