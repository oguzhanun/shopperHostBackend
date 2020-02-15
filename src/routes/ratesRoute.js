const express = require("express");
const db = require("../db/db");

const ratesRoute = new express.Router();

//tablodaki tüm bilgilerin gönderildiği alan
ratesRoute.get("/allRatesInfo", (req, res) => {
  let sql = "SELECT * FROM ratings";
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("unable to get data...", err);
      res.send(500);
    }
    res.send(succ);
  });
});

ratesRoute.post("/give/rate", async (req, res) => {
  console.log("data:", req.body);
  const data = req.body
  //console.log(data)

  // gelen rate tabloya girilecek (rateTakerId, rateGiverId, rateGiver, rateTaker, rate)
  let sql = `INSERT INTO ratings (rateGiver,rateTaker,rate, rateTakerId, rateGiverId) VALUES ( '${data.rateGiver}','${data.rateTaker}','${data.ortalama}', '${data.rateTakerId}','${data.rateGiverId}');`
  await db.query(sql, (err, succ) => {
    if (err) {
      console.log("unable to get data...", err);
      res.send(500);
    }
    res.status(200).send("ok");
  });
  
});

module.exports = ratesRoute;
