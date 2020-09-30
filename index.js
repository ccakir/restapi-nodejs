const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const database = require("./manager/database");
const user = require("./routes/user");
const { json } = require("express");

dotenv.config({ path: './.env' });

const con = new database({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

global.db = con;

const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/api/user", user);


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));


