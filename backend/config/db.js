const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+process.env.DB_USER_PASS+"@groupomaniadb.9fywi.mongodb.net/GroupomaniaDB",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Failed to connect MongoDB!", err));
