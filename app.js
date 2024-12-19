const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./src/routes/routes.js");
const accountRoutes = require("./src/routes/account.js");

app.use("/auth", authRoutes);
app.use("/account", accountRoutes);

module.exports = app;
