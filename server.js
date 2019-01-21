'use strict'
let req = require("express");
let express = req();
let fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
let config = require('./config/development');
let db = config.db;
let es = require('event-stream');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = config.db.mongo.db;

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server - DB =>" + dbName);

    const db = client.db(dbName);

    const csvFilePath = 'cars.csv'
    // const csvtoJsonHere = require('csvtojson')

     function csvtoJsonFunction (){

        fs.createReadStream(csvFilePath)
        .pipe(es.split(/\n/))

        .pipe(es.stringify())
        .pipe(es.writeArray(function(err,dataArray){
            console.log("dataArray========",dataArray)
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file.')
        })
    

        )
    
    
    
    }




    // let csv = require('csv-parser');
    //     let dataArray = [];
    //     let header;
    //     fs.createReadStream(csvFilePath)
    //     .pipe(csv())
    //     .on('data', function(data) {
    //             //    header = data.split(/\n/)[0];
    //         try {
    //             dataArray.push(data); 
    //         }
    //         catch(err) {
    //             console.log("err",JSON.stringify(err));
    //         }
    //     })
    //     console.log("Array Length",dataArray.length)
        

      csvtoJsonFunction();

 
    
});


