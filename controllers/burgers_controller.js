var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burgers: data,
    };
    console.log("router /", hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.create(
    ["name", "isDevoured"],
    [req.body.burger_name, req.body.isDevoured],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
});
router.put("/api/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.update(
    {
      isDevoured: req.body.isDevoured,
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.delete(condition, function(result) {
      if (result.changedRowsRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return console.log("this fails");
      } else {
        res.status(200).end();
      }
    });
  });

});
module.exports = router;
