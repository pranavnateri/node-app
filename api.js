const express = require('express')
const fs = require('fs')
const {json} = require("express");
const app = express()
const port = 8080
const url = require('url')

app.get("/", (req, res) => {
    fs.readFile(__dirname + '/' + 'index.json', 'utf8', (err, data) => {
        res.end(data);
    });
});

app.get("/get/:id", (req, res) => {
    fs.readFile(__dirname + '/' + 'index.json', 'utf8', (err, data) => {
        const obj = JSON.parse(data, function (key, value) {
            if (key == req.params.id) {
                res.end(value);
            }
        });
    });
});

app.post('/set', function(req, res){
    fs.readFile(__dirname + '/' + 'index.json', 'utf8', (err, data) => {
        var jsonData = JSON.parse(data);
        jsonData.push(req.query)
        console.log(jsonData)
        fs.writeFile('index.json', JSON.stringify(jsonData), function (err) {
            if (err) throw err;
            res.end('Saved!');
        });
    });
});

app.get('/search', function(req, res){
    var searchParam = url.parse(req.url)
    console.log(searchParam)
    var data = (new URLSearchParams(req.url))
    console.log(data)
    var searchPrefix = ""
    var searkeys = ""
    fs.readFile(__dirname + '/' + 'index.json', 'utf8', (err, file) => {
        const obj = JSON.parse(file, function (key, value) {
            for(var pair of data.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
                if(key.includes(pair[1])) {
                    console.log(key + " "+ value)
                    searkeys = key + "\n" + searkeys
                }
            }
        });
        console.log(searkeys)
        res.end(searkeys)
    })
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});