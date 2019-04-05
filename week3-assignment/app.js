require("dotenv").config()
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const mongoose = require('mongoose')
const spyRouter = require("./routes/spyRouter")
const passport = require("passport")
const flash = require("connect-flash")
const session = require("express-session")
const DB = require("./modules/database")
// const helmet = require('helmet')
// app.use(helmet({ieNoOpen: false}))
const app = express()

// Passport Config
require("./config/passport")(passport)

// app.enable('trust proxy')
// app.use ((req, res, next) => {
//   if (req.secure) {
//     // request was via https, so do no special handling
//     next();
//   } else {
//     // request was via http, so redirect to https
//     res.redirect('https://' + req.headers.host + req.url);
//   }
// })
// Connect to MongoDB

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
    process.env.DB_HOST
  }:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

// EJS
app.use(expressLayouts)
app.set("view engine", "ejs")
// DB.connect(
//   `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
//     process.env.DB_HOST
//   }:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`,
//   app
// )
// Express body parser
app.use(express.urlencoded({ extended: true }))

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  next()
})
app.use(express.static("spy-sites"))
// Routes
app.use("/modules", express.static("node_modules"))
app.use("/", require("./routes/index.js"))
app.use("/users", require("./routes/usersRouter.js"))
app.use("/spy", spyRouter)

app.listen(5000)