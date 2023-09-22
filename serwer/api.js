const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const app = express()
const port = 3001
app.use(cors())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"kraje"
})

con.connect(function(err){
    if(err) console.log(err)
    else console.log("connected")
})

app.get("/kontynent/:kontynent",(req,res)=>{
    const kontynent = req.params.kontynent
    const sql = `SELECT name FROM info WHERE continent = '${kontynent}'`


con.query(sql,(err,result,fields)=>{
    if(err) console.log(err)
    else res.send(result)
})
})

app.get("/populacja/:populacja",(req,res)=>{
    const populacja = req.params.populacja
    const sql1 = `SELECT name,population FROM info WHERE population >= ${populacja}`

    con.query(sql1,(err,result,fields)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
app.get("/kon",(req,res)=>{
    const sql3 = `SELECT DISTINCT continent FROM info`

    con.query(sql3,(err,result,fields)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
app.listen(port)