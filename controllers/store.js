const express = require("express");

const Store = require("../models/store");

//
//
//
//
//

//*add page
exports.getAdd = (req, res) => {
  res.render("stores/add");
};

//

//*create store
exports.createStore = (req, res) => {
  console.log(req.body);
  const newStore = new Store({
    name: req.body.name,
    email: req.body.email,
    des: req.body.des,

    route: req.body.route,
    street_number: req.body.street_number,
    locality: req.body.locality,
    postal_code: req.body.postal_code,
    administrative_area_level_1: req.body.administrative_area_level_1,
    country: req.body.country,
    latitude: req.body.latitude,
    longitude: req.body.longitude,

    tags: req.body.tags,

    updated: Date.now()
  });
  // newStore.save((err, result) => {
  //   if (err) throw err;
  //   res.redirect("/storeDetail/" + result._id);
  // });
  newStore.save(err => {
    if (err) throw err;
    res.redirect("/storeDetail/" + req.body.name);
  });
};

//

//*get store data
exports.getStore = (req, res) => {
  // let store_id = req.params.id;
  // const getStore = Store.findById(store_id);
  // getStore.exec((err, data) => {
  //   if (err) throw err;
  //   // res.json(data);
  //   res.render("stores/storeDetail", { store: data });
  // });

  let { name } = req.params;
  const getStore = Store.findOne({ name });
  getStore.exec({ name }, (err, data) => {
    if (err) throw err;
    res.render("stores/storeDetail", {
      store: data
    });
  });
};

//
//
//

//*update store page
exports.getUpdateStore = (req, res) => {
  let store_id = req.params.id;
  const query = Store.findById(store_id);
  query.exec((err, data) => {
    if (err) throw err;
    // res.json(data);
    res.render("stores/update", { store: data });
  });
};

//

//*update store data
exports.updateStore = (req, res) => {
  let store_id = req.body.id;
  const query = Store.findById(store_id);
  query.exec((err, result) => {
    if (err) throw err;
    console.log(result);
    result.name = req.body.name;
    result.email = req.body.email;
    result.des = req.body.des;
    result.tags = req.body.tags;
    result.save((err, data) => {
      if (err) throw err;
      res.render("stores/storeDetail", { store: data });
    });
  });
};
