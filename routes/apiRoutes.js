var db = require("../models");
var availableZipsArray = [
  "Allied Gardens-92120",
    "Alpine-91901",
    "Bay Park-92110",
    "Bonita-91902",
    "Bonsall-92003",
    "Borrego Springs-92004",
    "Boulevard-91905",
    "Campo-91906",
    "Cardiff-by-the-Sea-92007",
    "Carlsbad-92008",
    "Carlsbad-92009",
    "Carlsbad-92010",
    "Carlsbad-92011",
    "Carmel Valley-92130",
    "Chula Vista-91910",
    "Chula Vista-91911",
    "Chula Vista-91913",
    "Chula Vista-91914",
    "Chula Vista-91915",
    "Clairemont-92117",
    "College Grove-92115",
    "Coronado-92118",
    "Del Mar-92014",
    "Descanso-91916",
    "Downtown-92101",
    "Dulzura-91917",
    "East San Diego-92102",
    "East San Diego-92105",
    "El Cajon-92019",
    "El Cajon-92020",
    "El Cajon-92021",
    "Encanto-92114",
    "Encinitas-92024",
    "Escondido-92025",
    "Escondido-92026",
    "Escondido-92027",
    "Escondido-92029",
    "Fallbrook-92028",
    "Hillcrest-92103",
    "Imperial Beach-91932",
    "Jacumba-91934",
    "Jamul-91935",
    "Julian-92036",
    "La Jolla-92037",
    "La Mesa-91941",
    "La Mesa-91942",
    "Lakeside-92040",
    "Lemon Grove-91945",
    "Linda Vista-92111",
    "Logan Heights-92113",
    "Mira Mesa-92126",
    "Mission Village-92123",
    "National City-91950",
    "Normal Heights-92116",
    "North Park-92104",
    "Ocean Beach-92107",
    "Oceanside-92054",
    "Oceanside-92056",
    "Oceanside-92057",
    "Oceanside-92058",
    "Pacific Beach-92109",
    "Palomar Mountain-92060",
    "Paradise Hills-92139",
    "Pauma Valley-92061",
    "Pine Valley-91962",
    "Point Loma-92106",
    "Potrero-91963",
    "Poway-92064",
    "Ramona-92065",
    "Ranch Bernardo-92127",
    "Ranch Bernardo-92128",
    "Ranch Penasquitos-92129",
    "Ranch Santa Fe-92067",
    "Ranch Santa Fe-92091",
    "Ranchita-92066",
    "San Carlos-92119",
    "San Diego-92108",
    "San Diego-92112",
    "San Marcos-92069",
    "San Marcos-92078",
    "San Ysidro-92173",
    "Santa Ysabel-92070",
    "Santee-92071",
    "Scripps Ranch-92131",
    "Solana Beach-92075",
    "Sorrento Valley-92121",
    "South San Diego-92154",
    "Spring Valley-91977",
    "Spring Valley-91978",
    "Tierrasanta-92124",
    "University City-92122",
    "Valley Center-92082",
    "Vista-92081",
    "Vista-92083",
    "Vista-92084",
    "Warner Springs-92086"
]
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
      // res.json(dbReturn)

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
      // for (i = 0; i < 2; i++) {
      //   availableZipsArray.push(dbReturn[i].zipConcat)
      // }
      
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
      },
      include: [
        db.Comment
      ]
    }).then(function (dbReturn) {
      var dbLength = dbReturn.length - 1;
      var chartMonths = [];
      var houseChartMedian = [];
      var houseChartSales = [];
      var condoChartMedian = [];
      var condoChartSales = [];
      var allComments = [];
      var allCommentEmails = [];
      for (j=0;j<4; j++){
        if (dbReturn[0].Comments[j] !== undefined){
        allComments.push(dbReturn[0].Comments[j].Comment_Text)
        allCommentEmails.push(dbReturn[0].Comments[j].Email)
      }}
      //get all the chart data
      for (i = 0; i < dbReturn.length; i++) {
        chartMonths.push(dbReturn[i].Month);
        houseChartMedian.push(dbReturn[i].housePrice);
        houseChartSales.push(dbReturn[i].houseUnits);
        condoChartMedian.push(dbReturn[i].condoPrice);
        condoChartSales.push(dbReturn[i].condoUnits);
        
      }
      console.log("comments " + allComments)
      
      res.render("index", {
        //all the data for the green headers
        availableZips: availableZipsArray,
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
        condoChartSalesData: condoChartSales,
        commentText: allComments,
        emailName: allCommentEmails
      });
    });
  });

  app.post("/housing/:zip", function (req, res) {
    console.log(req.body)
    var houseId = req.body.HousingId
    var comment = req.body.comment
    db.Comment.create({
      zipConcat: req.params.zip,
      Comment_Text: comment,
      Email: req.body.email,
      HousingId: houseId
    }).then(function(){
      res.redirect(req.get('referer'))
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};