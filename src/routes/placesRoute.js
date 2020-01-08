const express = require("express")
const db = require("../db/db")


const placesRoute = new express.Router()

//girilen tüm test data nın tek seferde alınmasını sağlıyoruz...
placesRoute.get("/allPlacesInfo", (req,res)=>{
    let sql = "SELECT * FROM placesToSee"
    let placesData = db.query(sql,(err, succ)=>{
        if(err){
            console.log("something went wrong with reading data", err)
            res.send("there is problem with reading the data")
        }
        res.send(succ)
    })

})

//veritabanındaki tüm şehirleri çekiyoruz...
placesRoute.get("/sehirler",(req, res)=>{
    let sql = "SELECT DISTINCT sehir FROM placesToSee"
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with reading sehirler")
            res.send("something wrong with reading sehirler")
        }
        res.send(succ)
    })
})

//veritabanında belirli bir şehre ait bölgeleri çekiyoruz...
placesRoute.get("/bolgeler/:sehir",(req,res)=>{
    let sql = `SELECT DISTINCT bolge FROM placesToSee WHERE sehir='${req.params.sehir}'`
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with bolgeler",err)
            res.send("something wrong with bolgeler")
        }
        res.send(succ)
    })
})

//veritabanında belirli bolgeye ait kategorileri çekiyoruz...
placesRoute.get("/kategoriler/:sehir/:bolge",(req,res)=>{
    let sql = `SELECT DISTINCT kategori FROM placesToSee WHERE sehir='${req.params.sehir}' AND bolge='${req.params.bolge}'`
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with kategoriler",err)
            res.send("something wrong with kategoriler")
        }
        res.send(succ)
    })
})

//veritabanında belirli bir şehir, bolge ve kategoriye ait gezilecek yerlerin çekiyoruz...
placesRoute.get("/places/:sehir/:bolge/:kategori",(req,res)=>{
    let sql = `SELECT isim FROM placesToSee WHERE sehir='${req.params.sehir}' AND bolge='${req.params.bolge}' AND kategori='${req.params.kategori}'`
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with dükkanlar",err)
            res.send("something wrong with dükkanlar")
        }
        res.send(succ)
    })
})

//veritabanında belirli bir şehir, bolge, kategori ve isim bilgilerine göre belirli bir gezilecek yerin tüm bilgilerini çekiyoruz...
placesRoute.get("/place/:id",(req,res)=>{
    let sql = `SELECT * FROM placesToSee WHERE id='${req.params.id}'`
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with dükkanlar",err)
            res.send("something wrong with dükkanlar")
        }
        res.send(succ)
    })
})

module.exports = placesRoute