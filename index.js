const express = require("express")
const mongoose = require("mongoose")
require("express-async-errors")
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const user = require("./routes/user") 
const auth = require("./routes/auth") 
const tag = require("./routes/tag") 
const category = require("./routes/category") 
const decker = require("./routes/decker")

const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/backend')
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Something went wrong!'))

app.use("/api/user", user)
app.use("/api/auth", auth)
app.use("/api/tag", tag)
app.use("/api/category", category)
app.use("/api/decker", decker)

require("./prod")(app)

const port = process.env.PORT || config.get("port");
app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
