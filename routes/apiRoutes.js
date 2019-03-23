var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Housing.findAll({
      where: {zip: "SD"}
    }).then(function(dbExamples) {
      var availableZipsArray = [];
      for (i=0; i<96; i++){
        availableZipsArray.push(dbExamples[i].Zip_Concat)
      }
      res.render("index", {
        availableZips: availableZipsArray
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/housing/:zip", function(req, res) {
    db.Housing.findAll({ where: { Zip_Concat: req.params.zip } }).then(function(dbReturn) {
      var dbLength = dbReturn.length - 1;
      console.log("Our return lenghts latest month is at position " + dbLength)
      res.render("example", {
        houseSales: dbReturn[dbLength].House_Units,
        medianHouse: dbReturn[dbLength].House_Price,
        houseYear: dbReturn[dbLength].House_Percent,
        //return all data for the months for the charts
        condoSales: dbReturn[dbLength].Condo_Units,
        medianCondo: dbReturn[dbLength].Condo_Price,
        condoYear: dbReturn[dbLength].Condo_Percent,
      });
    });
  });

  app.post("/housing/:zip", function(req,res){
    db.Comment.create({
      Zip_Concat: req.params.zip,
      CommentText: req.body.comment,
      Email: req.body.email
    }).then(function(dbReturn){
      res.json(dbReturn)
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

