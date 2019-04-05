"use strict"
const spy = require("../models/spies")
exports.spy_list_get = () => {
  return spy
    .find()
    .then(spies => {
      return spies
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

exports.spy_create_post = data => {
  return spy
    .create(data)
    .then(item => {
      return { status: "Save OK: " + item.id }
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

exports.spy_number_get = () => {
  return spy
    .find()
    .exec()
    .then(spies => {
      console.log(spies.length)
      return spies.length
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

exports.spy_delete_record = data => {
  return spy
    .findByIdAndRemove(data.slice(3))
    
    .then(result => {
      return result
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

exports.spy_update_record = (id, newObj) => {
  spy.findOneAndUpdate(id, newObj, {new:true}).then(res => {
    return res
  }).catch(err => {
    return err
  })
}

