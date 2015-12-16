// Define dimensions of the plot
var margin = {top: 50, right: 60, bottom: 60, left: 300};
var height = 380; 
var width = 800;

// Define the transition duration
var transDur = 300;

// Set up a global variable for the names of the stats reported here
// (in hopes of making it easier to keep line colors consistent
var reportStats = [];

var stats;



// Load in the CRD quarterly stats table
d3.csv("Season.csv", function(crd) {

    // Format the variables as neeeded
    crd.forEach(function(d) {
        d.Year = +d.Year;
        d.Season = +d.Season;
        d.datestring = d.Year + "Q" + d.Season;
        d.Num = +d.Num;
    });

    // Subset to two sets of stats:
    // 1. Active Cases Reported for all metro residents and, separately,
    // just Denver residents.
    // 2. Active and latent tx starts and visits, for everyone
    var other_stats =["MedicResponse","AutoFireAlarm","TranstoAmr","MotorVehicleAccident","Others"];


    var qtrly = crd.filter(function(d) {
        return (d.Type == "AidResponse") || 

               (other_stats.indexOf(d.Type))
            
            ; });


    // Assign the data outside of the function for later use
    stats = qtrly;


    // Load the initial stats table
    makeMultiTable(stats);


    // Make a vector for all of the stats, so that plot attributes can be
    // kept consistent - probably a better way to do this.
    d3.selectAll("tbody tr")
        .each(function(d) { reportStats.push(d.key); });


    // Setup the line plot
    setupPlot(height, width, margin);
    

});