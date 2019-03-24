var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Housing.findAll({
      where: {
        Zip: "SD"
      },
      include: [db.Comment]
    }).then(function (dbReturn) {
      var dbLength = dbReturn.length - 1;
      res.json(dbReturn)
      var availableZipsArray = [];
      var chartMonths = [];
      var houseChartMedian = [];
      var houseChartSales = [];
      var condoChartMedian = [];
      var condoChartSales = [];
      //get all the chart data and put into arrays for the chart.js format
      for (i = 0; i < dbReturn.length; i++) {
        chartMonths.push(dbReturn[i].Month);
        houseChartMedian.push(dbReturn[i].housePrice);
        houseChartSales.push(dbReturn[i].houseUnits);
        condoChartMedian.push(dbReturn[i].condoPrice);
        condoChartSales.push(dbReturn[i].condoUnits)
        //get all the comments

      }
      for (i = 0; i < 2; i++) {
        availableZipsArray.push(dbReturn[i].zipConcat)
      }
      console.log(availableZipsArray)
      res.render("index", {
        availableZips: availableZipsArray,
        houseSales: dbReturn[dbLength].houseUnits,
        medianHouse: dbReturn[dbLength].housePrice,
        houseYear: dbReturn[dbLength].houseChange,
        condoSales: dbReturn[dbLength].condoUnits,
        medianCondo: dbReturn[dbLength].condoPrice,
        condoYear: dbReturn[dbLength].condoChange,
        houseChartMedData: houseChartMedian,
        houseChartSalesData: houseChartSales,
        condoChartMedData: condoChartMedian,
        condoChartSalesData: condoChartSales
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/housing/:zip", function (req, res) {
    db.Housing.findAll({
      where: {
        zipConcat: req.params.zip
      }
    }).then(function (dbReturn) {
      console.log("zip code return array returned: " + dbReturn)
      var dbLength = dbReturn.length - 1;
      var chartMonths = [];
      var houseChartMedian = [];
      var houseChartSales = [];
      var condoChartMedian = [];
      var condoChartSales = [];
      //get all the chart data
      for (i = 0; i < dbReturn.length; i++) {
        chartMonths.push(dbReturn[i].Month);
        houseChartMedian.push(dbReturn[i].housePrice);
        houseChartSales.push(dbReturn[i].houseUnits);
        condoChartMedian.push(dbReturn[i].condoPrice);
        condoChartSales.push(dbReturn[i].condoUnits)
      }
      console.log("Our return lenghts latest month is at position " + dbLength)
      res.render("example", {
        //all the data for the green headers
        houseSales: dbReturn[dbLength].houseUnits,
        medianHouse: dbReturn[dbLength].housePrice,
        houseYear: dbReturn[dbLength].houseChange,
        condoSales: dbReturn[dbLength].condoUnits,
        medianCondo: dbReturn[dbLength].condoPrice,
        condoYear: dbReturn[dbLength].condoChange,
        //all the data for the charts
        houseChartMedData: houseChartMedian,
        houseChartSalesData: houseChartSales,
        condoChartMedData: condoChartMedian,
        condoChartSalesData: condoChartSales
      });
    });
  });

  app.post("/housing/:zip", function (req, res) {
    db.Comment.create({
      zipConcat: req.params.zip,
      Comment_Text: req.body.comment,
      Email: req.body.email
    }).then(function (dbReturn) {
      res.json(dbReturn)
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};