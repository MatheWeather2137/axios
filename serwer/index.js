const axios = require("axios")
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
axios.get(`https://restcountries.com/v3.1/all`).then(resp => {
    for(i = 0; i<=resp.data.length - 1; i++){
    // console.log(resp.data[i].name.common,",",
    // resp.data[i].population,",",
    // resp.data[i].continents,",",
    // resp.data[i].capital)
    const name = resp.data[i].name.common
    const population = resp.data[i].population
    const continent = resp.data[i].continents[0]
    const capital = resp.data[i].capital
    

    const sql = `INSERT INTO info(name, population, continent, capital) VALUES ('${name}','${population}','${continent}','${capital}')`
    con.query(sql,(err,result,fields)=>{
        if(err) console.log(err)
        else console.log("dodano")
    })

    const sql2 = `SELECT * FROM info WHERE nazwa = '${name}'`
    if(!result.length){
    con.query(sql2,(err,result,fields)=>{
        if(err) console.log(err)
        else console.log("checked")
    })
}}})
app.listen(port)
