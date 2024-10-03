const express = require("express");
const cors = require("cors");
const color = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
// const contentRoutes = require("./Routes/content");
const bodyParser = require("body-parser");
const app = express();
connectDB();
app.use(cors());

const ports = process.env.port || 7000;
app.use(bodyParser.json());
// app.use("/content", contentRoutes);
app.listen(ports, () => console.log(`server running on port ${ports}`.yellow));
