const express = require("express");
const animalsRouter = require("./animals.js")
const classesRouter = require("./class.js")
const countriesRouter = require("./country.js")
const kindsRouter = require("./kind.js")
const usersRouter = require("./user.js")

let apiRouter = express.Router()

apiRouter.use('/animals', animalsRouter);
apiRouter.use('/class', classesRouter);
apiRouter.use('/country', countriesRouter);
apiRouter.use('/kind', kindsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;