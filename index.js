const express = require("express");
const mongodb = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();
const hbs = require("express-handlebars");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutDir: __dirname + "/views/layouts/",
  }),
);

app.use(express.static("puplic"));

connectToDB = async (connectionString) => {
  try {
    const client = await mongodb.connect(connectionString);
    db = client.db();
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error("Failed to conect to MongoDB", err);
  }
  return db;
};

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbname = process.env.MONGO_DATABASE;

let db,
  connectionString = `mongodb://${user}:${password}@${host}:${port}/${dbname}`;
db = connectToDB(connectionString);

app.get("/", async (req, res) => {
  const articles = await (await db).collection("articles").find().toArray();
  const authors = await (await db).collection("authors").find().toArray();
  res.render("index", { articles: articles });
});


app.get("/article/:slug", async (req, res) => {
  const articleResult = await (await db).collection("articles").findOne({ slug: req.params.slug });
  console.log("Article:", articleResult);
  res.render("article_tmpl", {article: articleResult,});
});

app.listen(3012, () => {
  console.log("Server is running on port 3012");
});
