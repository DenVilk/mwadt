const express = require("express");
const { Country } = require("../models/models.js");


let apiRouter = express.Router()

// create
apiRouter.post("/", async (req, res) => {
    const { name } = req.body;
    const country = await Country.create({name});
    return res.json({ country });
});

// getAll
apiRouter.get("/", async (req, res) => {
    let countries = await Country.findAll()
    return res.json(countries);
})

// getOne
apiRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const country = await Country.findOne({where: {id}});
    return res.json(country)
})

// update
apiRouter.put("/:id", async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const country = await Country.findOne({ where: { id } });

    country.name = name;

    await country.save();

    return res.json({ country });
});

// delete
apiRouter.delete("/:id", async (req, res) => {
    const {id} = req.params;
    let country = await Country.destroy({where:{id}});
    return res.json({id});
});

module.exports = apiRouter;