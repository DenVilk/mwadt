const express = require("express");
const { Kind } = require("../models/models.js");


let apiRouter = express.Router()

// create
apiRouter.post("/", async (req, res) => {
    const { name, classId } = req.body;
    const kind = await Kind.create({name, classId});
    return res.json({ kind });
});

// getAll
apiRouter.get("/", async (req, res) => {
    let kinds = await Kind.findAll()
    return res.json(kinds);
})

// getOne
apiRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const kind = await Kind.findOne({where: {id}});
    return res.json(kind)
})

// update
apiRouter.put("/:id", async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const kind = await Kind.findOne({ where: { id } });

    kind.name = name;

    await kind.save();

    return res.json({ kind });
});

// delete
apiRouter.delete("/:id", async (req, res) => {
    const {id} = req.params;
    let kind = await Kind.destroy({where:{id}});
    return res.json({id});
});

module.exports = apiRouter;