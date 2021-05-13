const express = require("express");
const router = express.Router();

const Product = require("../models/product");

//Get /products
router.get("/", (req,res)=>{
    const p = req.query.p ? req.query.p :1;
    Product.find({},(error,products)=>{
        if(error) console.log(error);
        res.json(products);
    }).skip((p-1)*4).limit(4);
});

//Get /products/category
router.get("/:category", (req,res)=>{
    const cat = req.params.category;
    const p = req.query.p ? req.query.p :1;

    Product.find({ category: cat},(error,products)=>{
        if(error) console.log(error);
        res.json(products);
    }).skip((p-1)*4).limit(4);
});

//Get /count/category
router.get("/count/:category", (req,res)=>{
    const cat = req.params.category;
    const p = req.query.p ? req.query.p :1;

    if(cat === "all"){
        Product.countDocuments({}, (error,count) => res.json(count));
    } else{
        Product.countDocuments({ category: cat}, (error,count) => 
        res.json(count)
        );
    }

});





module.exports = router;