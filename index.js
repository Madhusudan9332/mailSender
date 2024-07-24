const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require( "body-parser");

const mailRoutes = require("./route/mail");

const app = express();
app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("Error connecting Database", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(mailRoutes);

app.listen(process.env.PORT, () => console.log(`Server is up and running at port ${process.env.PORT}`));
