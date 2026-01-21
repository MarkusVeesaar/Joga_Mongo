const express = require("express")
const mongodb = require("mongodb").MongoClient
const dotenv = require("dotenv")
dotenv.config()

const app = express()

connectToDB = async (connectionString) =>{
    try{
        const client = await mongodb.connect(connectionString);
        db = client.db();
        console.log("Connected to mongoDB");
    } 
    catch (err){
    console.error("Failed to conect to MongoDB", err);
    } 
    return db;
} 

const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT
const dbname = process.env.MONGO_DATABASE

let db, connectionString = `mongodb://${user}:${password}@${host}:${port}/${dbname}`
db = connectToDB(connectionString);

app.listen(3012, () =>{
    console.log("Server is running on port 3012")
} )
