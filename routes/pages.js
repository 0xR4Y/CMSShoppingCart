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

//POST /pages
router.post("/", (req,res)=>{
   
    const name = req.fields.name;
    const slug = req.fields.slug;
    const content = req.fields.content;

    const page = new Page({
        name: name,
        slug: slug,
        content: content,
    });

    page.save(error =>{
        if(error) console.log(error);
        res.status(201).end();
    });
});

//PUT /pages/:id
router.put("/:id", (req,res)=>{

    const id = req.params.id;
    const name = req.fields.name;
    const slug = req.fields.slug;
    const content = req.fields.content;

    Page.findById(id,(error,page) => {
        if(error) console.log(error)

        page.name = name;
        page.slug = slug;
        page.content = content;

        page.save(error =>{
            if(error) console.log(error);
            res.status(201).end();
        });
    });

});

//Delete /delete/:id
router.delete("/:id", (req,res)=>{

    const id = req.params.id;
    const name = req.fields.name;
    const slug = req.fields.slug;
    const content = req.fields.content;

    Page.findByIdAndRemove(id,(error,page) => {
        if(error) console.log(error)

        page.name = name;
        page.slug = slug;
        page.content = content;

        page.save(error =>{
            if(error) console.log(error);
            res.status(201).end();
        });
    });

});

module.exports = router;