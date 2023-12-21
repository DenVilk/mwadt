const express = require("express");
const ApiError = require("../core/error.js");
const { Animal, Country, Kind, Class } = require("../models/models.js");


let apiRouter = express.Router()

// create
apiRouter.post("/", (req, res, next) => {
    const { age, description, gender, arrival_date, kind, country } = req.body;
    let k, c;
    try {
        Kind.findOne({ where: { name: kind } }).then(k => {
            console.log(k);
            try {
                Country.findOne({ where: { name: country } }).then(c => {
                    console.log(c);
                    Animal.create(
                        {
                            age,
                            description,
                            gender,
                            arrival_date,
                            kindId: k.id,
                            countryId: c.id
                        }
                    ).then(an => {
                        console.log(an);
                        return res.json({ an })
                    });
                })
            } catch {
                return next(ApiError.badRequest("Country with such name doesn't exist."))
            }
        });
    } catch {
        return next(ApiError.badRequest("Kind with such name doesn't exist."))
    }
    // console.log(k);

    // console.log(c);
    // let animal;
    // Animal.create(
    //     {
    //         age,
    //         description,
    //         gender,
    //         arrival_date,
    //         kindId: k.id,
    //         countryId: c.id
    //     }
    // ).then(res=>animal=res);
    // return res.json({ animal });
});

// getAll
apiRouter.get("/", async (req, res) => {
    let animals = await Animal.findAll({ include: [Country, Kind] })
    return res.json(animals);
})

// getOne
apiRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findOne({ where: { id }, include: [Country, Kind] });
    return res.json(animal)
})

// update
apiRouter.put("/:id", async (req, res) => {
    const { age, description, gender, arrival_date, country, kind } = req.body;
    const { id } = req.params;
    try {
        Kind.findOne({ where: { name: kind } }).then(k => {
            try {
                Country.findOne({ where: { name: country } }).then(c => {
                    console.log(c);
                    try {
                        Animal.findOne({ where: { id } }).then(an => {
                            an.age = age;
                            an.description = description;
                            an.gender = gender;
                            an.arrival_date = arrival_date;
                            an.kindId = k.id;
                            an.countryId = c.id;
                            an.save().then(r => {
                                return res.json(r);
                            })
                        })
                    } catch {
                        return next(ApiError.badRequest("Animal with such id doesn't exist."))
                    }
                })
            } catch {
                return next(ApiError.badRequest("Country with such name doesn't exist."))
            }
        });
    } catch {
        return next(ApiError.badRequest("Kind with such name doesn't exist."))
    }
});

// delete
apiRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    let animal = await Animal.destroy({ where: { id } });

    return res.json({ id });
});

module.exports = apiRouter;