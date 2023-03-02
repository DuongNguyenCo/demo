import express from "express";
import bodyParser from "body-parser";
import initWebRotes from "./route/web.js";
import connet from "./config/connDB";
import cors from "cors";
require("dotenv").config();

let app = express();

// Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3030");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRotes(app);
connet();

let port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("backend starting server " + port);
});
