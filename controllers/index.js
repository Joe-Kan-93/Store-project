const express = require("express");

const Store = require("../models/store");

//
//
//
//
//

//*index page
exports.getIndex = (req, res) => {
  const query = Store.find();
  query.exec((err, result) => {
    if (err) throw err;
    // res.json(users);
    res.render("index", { store: result });
  });
};

//
//
//

//*tags page
exports.getTag = (req, res) => {
  const query = Store.find();
  query.exec((err, result) => {
    if (err) throw err;
    // res.json(users);
    res.render("stores/tag", { store: result });
  });
};

//
//
//

//*map page
exports.getMap = (req, res) => {
  const query = Store.find();
  query.exec((err, result) => {
    if (err) throw err;
    // res.json(users);
    console.log(result);
    res.render("stores/map", { mapData: result });
  });
};

//*map data
exports.getMapData = (req, res) => {
  const query = Store.find();
  query.exec((err, result) => {
    if (err) throw err;
    // res.json(users);
    console.log(result);
    res.json(result);
  });
};
