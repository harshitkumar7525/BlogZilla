const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const port = 8000;
const sqlPass = require("./passwords.json").mysql;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

async function main() {
    try {
        let connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: sqlPass
        });
        await connection.query("CREATE DATABASE IF NOT EXISTS BlogZilla");
        await connection.query("USE BlogZilla");
        console.log("Connected to DB");
    } catch (error) {
        console.log("Cannot connect to DB: ", error);
    }
}

main();

app.get("/", (req, res) => {
    res.render("./LoginPage.ejs");
});



app.listen(port, () => {
    console.log("Server started on port " + port);
});