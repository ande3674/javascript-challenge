// from data.js
var tableData = data;

// Get a reference to the dom objects
var tbody = d3.select("tbody");
var tableObject = d3.select("#ufo-table");
var filterButton = d3.select("#filter-btn");

// loop through all data & add to the table
tableData.forEach(function(ufoSighting) {
    // append a new row to the table
    var newRow = tbody.append("tr");

    // add value from each key-value pair to its table cell
    Object.entries(ufoSighting).forEach(function([key, val]) {
        // append a cell
        var newCell = newRow.append("td");
        // write value to cell
        newCell.text(val);

    });
});

// listen for events and search through the date/time column to find rows that match user input
// form button: id="filter-btn"
// input area: id="datetime"
filterButton.on("click", function() {
    // Get form text
    var formInput = d3.select("#datetime");
    var formInputValue = formInput.property("value");
  
    // Filter table on date
    var filteredData = tableData.filter(sighting => sighting.datetime === formInputValue);
    console.log(filteredData);
    // clear the table
    tbody.html("");
    // add the filtered data
    filteredData.forEach(function(ufoSighting) {
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
  
});


// function to populate table
// function populateTable(tableData) {
//     // append a new row to the table
//     var newRow = tbody.append("tr");

//     // add value from each key-value pair to its table cell
//     Object.entries(tableData).forEach(function([key, val]) {
//         console.log(key, val);

//         // append a cell
//         var newCell = newRow.append("td");
//         // write value to cell
//         newCell.text(val);
// };






