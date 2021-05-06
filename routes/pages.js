const express = require("express");
const router = express.Router();

const Page = require("../models/page");

//Get pages
router.get("/", (req,res)=>{
    Page.find({},(error,pages)=>{
        if(error) console.log(error);
        res.json(pages);
    });
});

module.exports = router;