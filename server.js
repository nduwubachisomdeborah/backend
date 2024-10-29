// const express = require("express");
// const cors = require("cors");
// const color = require("colors");
// const dotenv = require("dotenv").config();
// const connectDB = require("./config/db");
// // const contentRoutes = require("./Routes/content");
// const bodyParser = require("body-parser");
// const app = express();
// const color = require("colors")
// // const userRoutes = require("./routes");
// const users = require("./routes/userroute");
// const {
//   Login,
//   updateUser,
//   getAllUsers,
// } = require("./controller/usercontroller");

// app.use(cors());

// const ports = process.env.port || 7000;
// app.use(bodyParser.json());
// app.use(cors())
// // app.use("/content", contentRoutes);
// app.use("/users", require("./rou"));
// app.listen(ports, () => console.log(`server running on port ${ports}`.yellow));
const express = require("express");
const cors = require("cors");
const color = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const bodyParser = require("body-parser");
const router = require("./routes/userroute.js");
const productRoutes=require("./routes/product.js")
const app = express();
connectDB();

const ports = process.env.port;
app.use(cors());
app.use(bodyParser.json());
app.use("/users", router);
app.use("/products", productRoutes);

app.listen(ports, () =>
  console.log(`server running on port ${ports}`.bgYellow)
);
