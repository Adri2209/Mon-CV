import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import session from "express-session"
import cvRouter from "./router/cvrouter.js"

const app = express()
const router = express.Router()
const db = process.env.BDD_URL
const PORT = process.env.PORT || 3000


app.use(session({ secret: process.env.SECRET_KEY, saveUninitialized: true, resave: true }));
app.use(express.static("./assets"))
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(express.json())

router.use(cvRouter)

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Connected at ${process.env.APP_URL}`);
  }
})

mongoose.connect(db, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to database mongodb (MON SUPER CV )");
  }
})

export default router