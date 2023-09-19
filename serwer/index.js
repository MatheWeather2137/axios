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
axios.get("https://restcountries.com/v3.1/all").then(res => {
    for (let i = 0; i < res.data.length; i++) {
        const nazwa = res.data[i].name.common;
        const populacja = res.data[i].population;
        const kontynent = res.data[i].continents;
        const stolica = res.data[i].capital;

        // Sprawdź, czy kraj już istnieje w bazie danych
        const sql = `SELECT * FROM info WHERE name = '${nazwa}'`;

        con.query(sql, (err, results, fields)=> {
            if (err) {
                console.log(err);
            } else {
                if (results.length === 0) {
                    // Kraj nie istnieje w bazie danych, dodaj go
                    const sql2 = `INSERT INTO info (name, population, continent, capital) VALUES ('${nazwa}', '${populacja}', '${kontynent}', '${stolica}')`;

                    con.query(sql2,(err, result, fields)=> {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Dodano nowy kraj: ${nazwa}`);
                        }
                    });
                } else {
                    console.log(`Kraj ${nazwa} już istnieje w bazie danych`);
                }
            }
        });
    }
});
app.listen(port)