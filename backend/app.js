const express = require("express");
const apiRouter = require("./api/api.js");
const seq = require('./core/db.js')
const cors = require('cors')
const {port} = require("./core/config.js");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/ping", (request, response) => {
    response.send("{\"message\":\"pong\"}")
});

app.use('/api', apiRouter)


const start = async () => {
    try{
        await seq.authenticate()
        await seq.sync();
        app.listen(port, () => console.log("Server was started =)"));
    }
    catch(e)
    {
        console.log(e)
    }
}

start();