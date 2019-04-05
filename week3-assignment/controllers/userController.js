"use strict"
const user = require("../models/users")
exports.user_find_one = (username) => {
  return user
    .find({ username: username})
    .then(user => {
      return user
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

exports.user_create_profile = data => {
    return user
      .create(data)
      .then(item => {
        return { status: "Save OK: " + item.id }
      })
      .catch(err => {
        console.log(err)
        return err
      })
  }