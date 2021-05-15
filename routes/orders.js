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


//POST /orders
router.post("/", (req,res)=>{
   
    const name = req.fields.name;
    const email = req.fields.email;
    const address = req.fields.address;
    const cart = req.fields.cart;
    const total = req.fields.total;

    const order = new Order({
        name: name,
        email: email,
        address: address,
        cart: cart,
        total: total
    });

    order.save(error =>{
        if(error) console.log(error);
        res.status(201).end();
    });
});

module.exports = router;