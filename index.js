const express = require("express")
const adminRoute = require("./src/routes/adminRoute")
const shopsRoute = require("./src/routes/shopsRoute")
//const placesRoute = require("./src/routes/placesRoute")


const app = express()
app.use("/admin", adminRoute)
app.use("/shops", shopsRoute)
//app.use("/places", placesRoute)


app.listen(3001, ()=>{
    console.log("server is up and running on port 3001")
    }
)