require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const fileupload = require("express-fileupload");
const users = require("./routes/api/v1/users");
const posts = require("./routes/api/v1/posts");
const admin = require("./routes/api/v1/admin");
const flag = require("./routes/api/v1/flag");
const keys = require("./config/keys");

// const fakePostData = require("./utils/faker");

const app = express();

//Middleware
app.use(
  cors({
    origin: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    exposedHeaders: ["Authorization"]
  })
);

app.use(
  fileupload({
    limits: { fileSize: 1024 * 1024 * 10 }, //10 meg limit in bytes
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true
  })
);

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static("public"));
app.use(helmet());

//db conect
const db = keys.mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    //seed data
    // fakePostData();

    console.log("mongo db connnected");
  })
  .catch(err => console.log(err));

//use routes
app.use("/api/users", users);
app.use("/api/posts", posts);

app.use("/api/admin", admin);
app.use("/api/flag", flag);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//
// app.use((req, res, next) => {

// })

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
