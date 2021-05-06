const express = require("express");
const router = express.Router();

const Order = require("../models/order");

//Get pages
router.get("/", (req,res)=>{
    Order.find({},(error,orders)=>{
        if(error) console.log(error);
        res.json(orders);
    });
});

module.exports = router;