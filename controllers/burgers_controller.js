var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data,
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.insertOne(
    ["name", "isDevoured"],
    [req.body.burger_name, req.body.isDevoured],
    function (result) {
      res.json({
        id: result.insertId
      });
    }
  );
});
router.put("/api/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.updateOne({
      isDevoured: req.body.isDevoured,
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
  router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    burger.deleteOne(condition, function (result) {
      if (result.changedRowsRows == 0) {
        return console.log("this fails");
      } else {
        res.status(200).end();
      }
    });
  });

});
module.exports = router;
