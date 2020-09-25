// from data.js
var tableData = data;
//console.log(tableData[0]["datetime"]);

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
        // append a cell
        var newCell = newRow.append("td");
        // write value to cell
        newCell.text(val);
    });
}

function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get form date text
    var formDateInputValue = d3.select("#datetime").property("value");
    // Get form city text
    var formCityInputValue = d3.select("#city").property("value");
    // Get form state text
    var formStateInputValue = d3.select("#state").property("value");
    console.log(formStateInputValue);
    // Get form country text
    var formCountryInputValue = d3.select("#country").property("value");
    // Get form shape text
    var formShapeInputValue = d3.select("#shape").property("value");

    // Add search terms to array:
    var searchTermDict = {"datetime": formDateInputValue, "city": formCityInputValue, "state": formStateInputValue, "country": formCountryInputValue, "shape": formShapeInputValue};

    // Reload all data if no data entered 
    if (formDateInputValue === "" && formCityInputValue === "" && formStateInputValue === "" && formCountryInputValue === "" && formShapeInputValue === "") {
        noData.text("");
        tbody.html("");
        tableData.forEach(populateTable);
    }

    else {
        noData.text("");
        tbody.html("");
        // Filter table
        var filteredData = [];
        Object.entries(searchTermDict).forEach(([key, val]) => {
            console.log(val);
            if (val !== "") {
                var tempFilteredData = tableData.filter(sighting => sighting[key] === val);
                console.log(tempFilteredData);
                tempFilteredData.forEach((s) => {
                    filteredData.push(s);
                });
            };
        });
        
        // Fill table with the data
        if (filteredData.length === 0) {
            noData.text(`No data found on date ${formDateInputValue}`);
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





