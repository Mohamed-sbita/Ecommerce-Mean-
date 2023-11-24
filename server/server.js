const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));
require("dotenv").config();


const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const FlouciRouter = require("./routes/flouci");
const CategoryRouter  =require("./routes/categories")
const OrderRouter = require("./routes/orders")


// connect to database
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DATABASE, {
   
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

  app.use("/getimageP", express.static('./public/uploads/products'));
  app.use("/api", authRouter);
  app.use("/api", productsRouter);
  app.use("/api", FlouciRouter);
  app.use("/api", CategoryRouter);
  app.use("/api", OrderRouter);

app.listen(process.env.PORT, () => console.log(`app is running on ${process.env.PORT}`));
