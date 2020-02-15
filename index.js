const express = require("express")
const path = require("path")
const shopsRoute = require("./src/routes/shopsRoute")
const ratesRoute = require("./src/routes/ratesRoute")

const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json())

const folder = path.join(__dirname, "./src/assets")
app.use(express.static(folder))

app.use("/shops", shopsRoute)
app.use("/ratings", ratesRoute)

app.listen(3001, ()=>{
    console.log("server is up and running on port 3001")
    }
)