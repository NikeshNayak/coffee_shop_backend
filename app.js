const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const ip = require('ip');

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const adminAuth = require('./routes/admin/adminAuth.routes');
const adminProducts = require('./routes/admin/product.routes');

const appAuth = require('./routes/app/auth.routes');
const appProducts = require('./routes/app/product.routes');

app.use("/admin/auth", adminAuth);
app.use("/admin/product", adminProducts);

app.use("/app/auth", appAuth);
app.use("/app/product", appProducts);

app.use("/media", express.static(path.join(__dirname)));

app.use((error, req, res, next) => {
  console.log("Error Handler");
  const status = error.statusCode || 500;
  const message = error.message;
  console.log(error.stack);
  res.status(status).json({ success: false, message: message });
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(async (result) => {
    app.listen(process.env.PORT, async () => {
      console.log(`${ip.address()}`);
      console.log(`listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
