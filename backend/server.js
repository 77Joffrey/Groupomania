const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();
const cookieParser = require("cookie-parser");

const usersLogRoutes = require("./routes/users_log_routes");
const usersRoutes = require("./routes/users_routes");
const postsRoutes = require("./routes/post_routes");
const userRequireRoutes = require("./routes/auth_routes");

app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/* --------------------------------------- UploadFile - Post images -------------------------------------------- */
app.use(fileUpload());

app.post("/api/posts/file", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/../client/public/images/posts/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.status(201).json({ fileName: file.name, filePath: `/images/posts/${file.name}` });
  });
});

/* ------------------------------------------------------------------------------------------------------ */

app.use("/api/token", userRequireRoutes);
app.use("/api/users", usersLogRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
