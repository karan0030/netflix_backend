require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");





//DB Connection
mongoose
  .connect(process.env.MONGODB_URI||process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);



app.use(express.static(__dirname + "build")); 
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", index.html));
});


//PORT
const port = process.env.PORT || 8080;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
