// from data.js
var tableData = data;

// Get a reference to the dom objects
var tbody = d3.select("tbody");
var tableObject = d3.select("#ufo-table");
var filterButton = d3.select("#filter-btn");
var form = d3.select("#form");
var noData = d3.select("#no-data");

// loop through all data & add to the table
tableData.forEach(populateTable);

// Create event handlers 
filterButton.on("click", runEnter);
form.on("submit",runEnter);

// function to populate table
function populateTable(tableData) {

    // append a new row to the table
    var newRow = tbody.append("tr");

    // add value from each key-value pair to its table cell
    Object.entries(tableData).forEach(function([key, val]) {
        console.log(key, val);

        // append a cell
        var newCell = newRow.append("td");
        // write value to cell
        newCell.text(val);
    });
}

function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get form text
    var formInput = d3.select("#datetime");
    var formInputValue = formInput.property("value");

    // Reload all data if no data entered 
    if (formInputValue === "") {
        tableData.forEach(populateTable);
    }

    else {
        // Filter table on date
        var filteredData = tableData.filter(sighting => sighting.datetime === formInputValue);
        
        if (filteredData.length === 0) {
            noData.text(`No data found on date ${formInputValue}`);
        }
        else {
            // clear the data
            noData.text("");
            tbody.html("");
            // add the filtered data by calling the populateTable function
            filteredData.forEach(populateTable);
        }
    }
    
};





