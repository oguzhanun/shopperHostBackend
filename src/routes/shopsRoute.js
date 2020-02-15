const express = require("express");
const db = require("../db/db");

const shopsRoute = new express.Router();

//tablodaki tüm bilgilerin gönderildiği alan
shopsRoute.get("/allPlacesInfo", (req, res) => {
  let sql = "SELECT * FROM shops";
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("unable to get data...", err);
      res.send(500);
    }
    res.send(succ);
  });
});

shopsRoute.get("/staticInfo", (req, res) => {
  let sql = "SELECT sehir,bolge,kategori FROM shops";
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("unable to get data...", err);
      res.send(500);
    }
    res.send(succ);
  });
});

shopsRoute.get("/sehirler", (req, res) => {
  //let sql = "SELECT DISTINCT sehir FROM (SELECT sehir FROM shops UNION SELECT sehir FROM placesToSee) sehirler"
  let sql = "SELECT DISTINCT sehir FROM shops";
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("unable to get sehirler...", err);
      res.send(500);
    }
    res.send(succ);
  });
});

//veritabanında belirli bir şehre ait bölgeleri çekiyoruz...
shopsRoute.get("/bolgeler/:sehir", (req, res) => {
  let sql = `SELECT DISTINCT bolge FROM shops WHERE sehir='${req.params.sehir}'`;
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("something wrong with bolgeler", err);
      res.send("something wrong with bolgeler");
    }
    res.send(succ);
  });
});

//veritabanında belirli şehre ait kategorileri çekiyoruz...
shopsRoute.get("/kategoriler/:kategori/:sehir/", (req, res) => {
  let sql = `SELECT DISTINCT ${req.params.kategori}, kategori FROM shops WHERE sehir='${req.params.sehir}' ` //ORDER BY kategori ASC; AND bolge='${req.params.bolge}
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("something wrong with kategoriler", err);
      res.send("something wrong with kategoriler");
    }
    res.send(succ);
  });
});

//veritabanında belirli şehre ait tüm dükkan konumlarınu çekiyoruz...
shopsRoute.get("/dukkanKonumlari/:sehir/", (req, res) => {
  let sql = `SELECT konum,isim FROM shops WHERE sehir='${req.params.sehir}' ` //ORDER BY kategori ASC; AND bolge='${req.params.bolge}
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("something wrong with kategoriler", err);
      res.send("something wrong with kategoriler");
    }
    res.send(succ);
  });
});

//veritabanında belirli bir şehir ve kategoriye ait dükkanları çekiyoruz...
shopsRoute.get("/dukkanlar/:sehir/:kategori", (req, res) => {
  let sql = `SELECT isim,id,resim1,telefon,konum,rating FROM shops WHERE sehir='${req.params.sehir}' AND kategori='${req.params.kategori}' OR kategoriEN='${req.params.kategori}' OR kategoriAR='${req.params.kategori}' OR kategoriDE='${req.params.kategori}' OR kategoriRU='${req.params.kategori}'`;
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("something wrong with dükkanlar", err);
      res.send("something wrong with dükkanlar");
    }
    res.send(succ);
  });
});

//veritabanında belirli bir id'ye göre bir dükkanın tüm bilgilerini çekiyoruz...
shopsRoute.get("/dukkan/:id", (req, res) => {
  let sql = `SELECT * FROM shops WHERE id='${req.params.id}'`;
  db.query(sql, (err, succ) => {
    if (err) {
      console.log("something wrong with dükkanlar", err);
      res.send("something wrong with dükkanlar");
    }
    res.send(succ);
  });
});

module.exports = shopsRoute;
