const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const path = require("path");
const app = express();

const userAuthRoutes = require('./routes/users_auth_routes')
const userRoutes = require('./routes/users_routes')

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use("/api/users/", userAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/:id", userRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
