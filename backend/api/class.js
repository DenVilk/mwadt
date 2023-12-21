const express = require("express");
const { Class } = require("../models/models.js");


let apiRouter = express.Router()

// create
apiRouter.post("/", async (req, res) => {
    const { name } = req.body;
    const class_obj = await Class.create({name});
    return res.json({ class_obj });
});

// getAll
apiRouter.get("/", async (req, res) => {
    let classes = await Class.findAll()
    return res.json(classes);
})

// getOne
apiRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const class_obj = await Class.findOne({where: {id}});
    return res.json(class_obj)
})

// update
apiRouter.put("/:id", async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const class_obj = await Class.findOne({ where: { id } });

    class_obj.name = name;

    await class_obj.save();

    return res.json({ class_obj });
});

// delete
apiRouter.delete("/:id", async (req, res) => {
    const {id} = req.params;
    let class_obj = await Class.destroy({where:{id}});
    return res.json({id});
});

module.exports = apiRouter;