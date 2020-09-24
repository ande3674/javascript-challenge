// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");
var tableObject = d3.select("#ufo-table");

// loop through all data
tableData.forEach(function(ufoSighting) {
    console.log(ufoSighting);
    
    // append a new row to the table
    var newRow = tbody.append("tr");

    // add value from each key-value pair to its table cell
    Object.entries(ufoSighting).forEach(function([key, val]) {
        console.log(key, val);

        // append a cell
        var newCell = newRow.append("td");
        // write value to cell
        newCell.text(val);

    });

});




// Step 5: Use d3 to update each cell's text with weather report values (weekday, date, high, low)
// data.forEach(function(weatherReport) {
//     console.log(weatherReport);
//     var row = tbody.append("tr");
//     Object.entries(weatherReport).forEach(function([key, value]) {
//       console.log(key, value);
//       // Append a cell to the row for each value
//       // in the weather report object
//       var cell = row.append("td");
//       cell.text(value);
//     });
//   });