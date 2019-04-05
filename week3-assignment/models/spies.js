"use strict"
const mongoose = require("mongoose")

const Schema = mongoose.Schema
const spySchema = new Schema({
  time: Date,
  category: String,
  title: String,
  details: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  thumbnail: String,
  image: String,
  original: String
})

module.exports = mongoose.model("Spy", spySchema)
