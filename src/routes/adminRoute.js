const express = require("express")
const db = require("../db/db")


db.connect((err,success)=>{
    if(err) throw err
    console.log("you are connected to db...", success)
})

const adminRoute = new express.Router()


// localhost üzerindeki veritabanı için artık bu metoda gerek kalmadı.
// çünkü veritabanına bağlanırken zaten mevcut bir veritabanı ismi ile bağlanıyoruz.
// şu anki kullanılan veritabanı "shopperHost".
adminRoute.post("/dbCreate/:name", (req,res)=>{
    let sql = `CREATE DATABASE ${req.params.name}`
    db.query(sql, (err, succ)=>{
        if(err) {
            console.log("something went wrong while creating database", err)
            res.send("something went wrong while creating database")
        }
        console.log("database created...", succ)
        res.send("ok")
    })
})

//39.963518, 32.842990
//burada url üzerinden gelen isme göre yeni bir tablo oluşturabiliyoruz.
adminRoute.post("/tableCreate/:name", (req, res)=>{
    let sql = `CREATE TABLE ${req.params.name}(id int AUTO_INCREMENT, sehir VARCHAR(25), bolge VARCHAR(25), kategori VARCHAR(25), 
                                                isim VARCHAR(255), telefon VARCHAR(15), bilgi TEXT, konum VARCHAR(19), 
                                                resim1 VARCHAR(255), resim2 VARCHAR(255), resim3 VARCHAR(255), PRIMARY KEY(id))`
    db.query(sql, (err, succ)=>{
        if(err){
            console.log("something went wrong while creating table...", err)
            res.send("something went wrong while creating table...")
        }
        res.send("ok")
    })
})

//test data girişini buradan sağlıyoruz...
adminRoute.post("/postData/:tableName", (req,res)=>{
    let data = {sehir:"istanbul", bolge:"kadıköy", kategori:"tekstil", isim:"Tekstilin Kralı", 
                telefon:"05404797534", bilgi:"This is a wonderful place" + 
                "You won't be regretted",
                konum:"40.947050,29.806030"}
    let sql =`INSERT INTO ${req.params.tableName} SET ?`
    db.query(sql, data, (err,succ)=>{
        if(err){
            console.log("something wrong with the inserting query...", err)
        }
        console.log(succ)
        res.send("Data sent to database...")
    })
})

//girilen tüm test data nın tek seferde alınmasını sağlıyoruz...
adminRoute.get("/allShopsInfo", (req,res)=>{
    let sql = "SELECT * FROM shops"
    let shopsData = db.query(sql,(err, succ)=>{
        if(err){
            console.log("something went wrong with reading data", err)
            res.send("there is problem with reading the data")
        }
        res.send(succ)
    })

})

//girilen tüm test data nın tek seferde alınmasını sağlıyoruz...
adminRoute.get("/allPlacesInfo", (req,res)=>{
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
adminRoute.get("/sehirler",(req, res)=>{
    let sql = "SELECT DISTINCT sehir FROM shops"
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with reading sehirler")
            res.send("something wrong with reading sehirler")
        }
        res.send(succ)
    })
})

//veritabanında belirli bir şehre ait bölgeleri çekiyoruz...
adminRoute.get("/bolgeler/:sehir",(req,res)=>{
    let sql = `SELECT DISTINCT bolge FROM shops WHERE sehir='${req.params.sehir}'`
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with bolgeler",err)
            res.send("something wrong with bolgeler")
        }
        res.send(succ)
    })
})

//veritabanında belirli bolgeye ait kategorileri çekiyoruz...
adminRoute.get("/kategoriler/:sehir/:bolge",(req,res)=>{
    let sql = `SELECT DISTINCT kategori FROM shops WHERE sehir='${req.params.sehir}' AND bolge='${req.params.bolge}'`
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with kategoriler",err)
            res.send("something wrong with kategoriler")
        }
        res.send(succ)
    })
})

//veritabanında belirli bir şehir, bolge ve kategoriye ait dükkanları çekiyoruz...
adminRoute.get("/dukkanlar/:sehir/:bolge/:kategori",(req,res)=>{
    let sql = `SELECT isim FROM shops WHERE sehir='${req.params.sehir}' AND bolge='${req.params.bolge}' AND kategori='${req.params.kategori}'`
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with dükkanlar",err)
            res.send("something wrong with dükkanlar")
        }
        res.send(succ)
    })
})

//veritabanında belirli bir şehir, bolge, kategori ve isim bilgilerine göre belirli bir dükkanın tüm bilgilerini çekiyoruz...
adminRoute.get("/dukkan/:id",(req,res)=>{
    let sql = `SELECT * FROM shops WHERE id='${req.params.id}'`
    db.query(sql,(err,succ)=>{
        if(err){
            console.log("something wrong with dükkanlar",err)
            res.send("something wrong with dükkanlar")
        }
        res.send(succ)
    })
})

module.exports = adminRoute