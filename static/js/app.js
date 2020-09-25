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
    var newRow = tbody.append("tr");
    Object.entries(tableData).forEach(function([key, val]) {
        var newCell = newRow.append("td");
        newCell.text(val);
    });
}

function clearStuff() {
    noData.text("");
    tbody.html("");
}

function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get form text
    var formDateInputValue = d3.select("#datetime").property("value");
    var formCityInputValue = d3.select("#city").property("value");
    var formStateInputValue = d3.select("#state").property("value");
    var formCountryInputValue = d3.select("#country").property("value");
    var formShapeInputValue = d3.select("#shape").property("value");

    // Add search terms to array:
    var searchTermDict = {  "datetime": formDateInputValue, 
                            "city": formCityInputValue, 
                            "state": formStateInputValue, 
                            "country": formCountryInputValue, 
                            "shape": formShapeInputValue };

    // Reload all data if no data entered into search fields
    if (formDateInputValue === "" && formCityInputValue === "" && formStateInputValue === "" && formCountryInputValue === "" && formShapeInputValue === "") {
        clearStuff();
        tableData.forEach(populateTable);
    }

    else {
        clearStuff();
        // Filter table
        var filteredDataAND = tableData;
        Object.entries(searchTermDict).forEach(([key, val]) => {
            if (val !== "") {
                filteredDataAND = filteredDataAND.filter(sighting => sighting[key] === val);
                console.log(filteredDataAND);
            };
        });
        
        if (filteredDataAND.length === 0) { // display message if no matching results
            noData.text("No data found for search terms.");
        }
        else { // Fill table with the data
            clearStuff();
            filteredDataAND.forEach(populateTable);
        }
    }   
};

