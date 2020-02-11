const express = require("express")
const path = require("path")
const shopsRoute = require("./src/routes/shopsRoute")


const app = express()

const folder = path.join(__dirname, "./src/assets")
app.use(express.static(folder))

app.use("/shops", shopsRoute)

app.listen(3001, ()=>{
    console.log("server is up and running on port 3001")
    }
)