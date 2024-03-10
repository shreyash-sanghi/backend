require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.PORT || 1234;
const cors = require("cors");
const auth = require("./src/routes/auth");
const skill = require("./src/routes/skill");
const userRoutes = require("./src/routes/userRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const messageRoutes = require("./src/routes/messageRoutes");

const { notFound, errorHandler } = require("./src/middleware/errorMiddleware");
try {
  mongoose.connect(process.env.DatabaseConnect).then(() => {
    console.log("Connected to Database");
  
  })
} catch (error) {
  console.log(error);
}
app.use(
  cors({
    origin: "https://virtualhackathon.vercel.app",
    methods: ["POST", "GET", "OPTIONS", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://virtualhackathon.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Set Use State
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth);
app.use(skill);
//app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/user", userRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Hello how are you");
});

//Connect Data Base
app.get("/",(req,res)=>{
  res.send("Hello...")
})

app.listen(port, () => {
  console.log("Connection successfully... ");
});
