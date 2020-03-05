"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

//this is an object
const { flights } = require("./test-data/flightSeating");

express()
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/seat-select/:flightnum", (req, res) => {
    const flightnum = req.params.flightnum;
    let thisFlight = Object.keys(flights).find(flight => flight === flightnum);
    res.json(flights[thisFlight]);
  })
  .get("/confirmed", (req, res) => {
    //add the confirmation
    // reservations.push()
    //   return {success: true}
  })
  // .get('/view-reservation')

  .use((req, res) => res.send("Not Found"))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
