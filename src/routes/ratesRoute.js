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
  await db.query(sql, async (err, succ) => {
    if (err) {
      console.log("unable to get data...", err);
      res.send(500);
    }

    let sql2 = `SELECT rate FROM ratings WHERE rateTakerId=${data.rateTakerId}`
    
    await db.query(sql2, async (err,succ)=>{
      if(err){
        console.log("unable to compute new rate avarage...")
        res.send(500)
      }
      let toplam = 0

      succ.map((cell)=>{
        toplam = toplam + cell.rate
      })
      
      let average = toplam / succ.length
      let sql3 = `UPDATE shops SET rating=${average} WHERE id=${data.rateTakerId}`
      await db.query(sql3, (err,succ)=>{
        if(err){
          console.log("unable to write the avarage rating into shops table...")
          res.send(500)
        }
        console.log("SUCCESS:",succ)
        res.status(200).send("ok");
      })
    })
  });
});

module.exports = ratesRoute;
