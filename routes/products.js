const express = require("express");
const router = express.Router();
const path = require('path');
const appDir = path.dirname(require.main.filename);
const fs =  require('fs');

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

//POST /products
router.post("/", (req,res)=>{
   
    const name = req.fields.name;
    const category = req.fields.category;
    const description = req.fields.description;
    const imageUpload = req.files.imageUpload;
    let image = imageUpload ? imageUpload.name : "noimage.png";
    const price = req.fields.price;

    if (image !== "noimage.png") {
        image = +new Date() + "_" + image;
        const oldPath = imageUpload.path;
        const newPath = `${appDir}/public/media/products/${image}`;
        const rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, (error) => {
            if (error) res.status(500).send(error);
        });
    }

    const product = new Product({
        name: name,
        category: category,
        description: description,
        image: image,
        price: price,
    });

    product.save((error) => {
        if (error) res.status(500).send(error);
        res.status(201).end();
    });
});

//PUT /products/id
router.put("/", (req,res)=>{
   
    const id = req.fields.id;
    const name = req.fields.name;
    const category = req.fields.category;
    const description = req.fields.description;
    const imageUpload = req.files.imageUpload;

    const price = req.fields.price;

    Product.findById(id, (error, product) => {

        if (error) res.status(500).send(error);

        if (imageUpload) {
           
            if (product.image != "noimage.png") {
                const imagePath = `${appDir}/public/media/products/${product.image}`;
                fs.unlink(imagePath, (error) => {
                    if (error) res.status(500).send(error);
                });
            }

            const image = +new Date() + "_" + imageUpload.name;
            const oldPath = imageUpload.path;
            const newPath = `${appDir}/public/media/products/${image}`;
            const rawData = fs.readFileSync(oldPath);

            fs.writeFile(newPath, rawData, (error) => {
                if (error) res.status(500).send(error);
            });

            product.image = image;

        }

        product.name = name;
        product.category = category;
        product.description = description;
        product.price = price;

        product.save((error) => {
            if (error) res.status(500).send(error);
            res.status(201).end();
        });
    });
});


// DELETE /products/id
router.delete("/:id", (req, res) => {
   
    Product.findById(req.params.id, (error, product) => {
        if (error) res.status(500).send(error);

        if (product.image != "noimage.png") {
            const imagePath = `${appDir}/public/media/products/${product.image}`;
            fs.unlink(imagePath, (error) => {
                if (error) res.status(500).send(error);
            });
        }

        product.remove();
        res.status(204).end();
    });
});

module.exports = router;