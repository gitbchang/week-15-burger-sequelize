var express = require("express");
var router = express.Router();

//import the model (burger.js) to use its database functions
// var burger = require("../models/burger.js");
var db = require("../models");

router.get("/", function(req, res){
    // include: [db.burger_owner]
    db.burgers.findAll({})
      .then(function(result){
        var burgerObject = {
          burgs: result          
        }

        res.render("index", burgerObject);
      });
});

router.post("/", function(req, res){

    var newBurger = {
        burger_name: req.body.addBurger,
        
    }
    db.burgers.create(newBurger).then(function(result){
        // if you res.json the result, it will redirect and show the newBurger's json object
        // res.json(result);
        res.redirect("/");
        // console.log(result);
    })
});

router.post("/api/:id", function(req, res){
    // burger.update(req.params.id, function(){
    //     res.redirect("/");
    //     console.log(res);
    // });
    db.burgers.update({
        devoured: 1
    },
    {
        where: {
            id: req.params.id
        }
    }).then(function(dbPost){
        console.log(dbPost);
        res.redirect("/");
    });

});


module.exports = router;