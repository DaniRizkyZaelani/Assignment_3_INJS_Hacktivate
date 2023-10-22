const express = require("express");
const app = express();
// const env = process.env.NODE_ENV || "development";
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

module.exports = app;