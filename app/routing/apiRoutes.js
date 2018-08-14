// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friend-data.
// ===============================================================================

var friendData = require("../data/friend");

//console.log(friendData);

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits a survey form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is compared with friend data to find the  closest match
  // (ex. User fills out a survey table... this data is then sent to the server...
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests for the closest match.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

    var guestScores = [];
    for (i=0; i<req.body.scores.length; i++) {
        guestScores.push(parseInt(req.body.scores[i]));
    }

    var matchArr =[];
    for(i=0;i<friendData.length;i++) {    
        matchArr.push(findMatch(guestScores, friendData[i].scores));
    }

    res.json(friendData[indexOfSmallest(matchArr)]);
    
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!
  // For future choice

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];

    console.log(friendData);
  });

  function  findMatch(arr1,arr2) {
      var x = 0;
      for(j=0;j<arr1.length;j++) {
        x +=  Math.abs(arr1[j] - arr2[j]);
      }

      return x;
  }; 

  function indexOfSmallest(arr) {
      var lowest = 0;
      for (var i = 1; i < arr.length; i++) {
          if(arr[i] < arr[lowest]) {
              lowest = i;
          }
      }
      return lowest;
  }
};