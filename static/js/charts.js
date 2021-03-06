// python -m http.server
// http://localhost:8000/

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("data/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
// Initialize the dashboard
init();


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("data/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    let samples = data.samples;
    let metadata = data.metadata; 
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let sampleFilter = samples.filter(sampleObj => sampleObj.id == sample);
    // filter out for metadata:
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    //  5. Create a variable that holds the first sample in the array.
    let sampleArray = sampleFilter[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otuID = sampleArray.otu_ids;
    let otuLabels =  sampleArray.otu_labels;
    let sampleValues =  sampleArray.sample_values;
    let wfreq = Object.values(result)[6];
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuID.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      name: "Bacterial Species (OTUs)",
      type: "bar",
      orientation: "h"
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacterial Species Found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    
    };
    // 10. Use Plotly to plot the data with the layout. 
   // Plotly.newPlot("bar", barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuID,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuID,
        colorscale: "Earth"
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };

    // 3. Use Plotly to plot the data with the layout on initialalizing
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // On change to the DOM, call getData()
  d3.selectAll("#charts").on("change", getData);
  function getData() {
    var dropdownMenu = d3.select("#charts");
    // Assign the value of the dropdown menu option to a variable
    var choice = dropdownMenu.property("value");
    console.log(choice);
    if (choice == 'bubbleChart') {
      Plotly.purge("bar");
       Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    }
    else  {
      Plotly.purge("bubble");
      Plotly.newPlot("bar", barData, barLayout);
    }    
  };
  getData(); 


  
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
    domain: { x: [0, 1], y: [0, 1] },
		value: wfreq,
		title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
		type: "indicator",
		mode: "gauge+number",
    gauge: {
      axis: {range: [null,9], tickwidth: 1, tickclolor: "#"},
      bar: { color: "808080" },
      steps :[
        {range: [0,2], color: "rgba(0, 105, 11, .5)"},
        {range: [2,4], color: "#40E0D0"},
        {range: [4,6], color: "#90EE90"},
        {range: [6,8], color: "#D2B48C"},
        {range: [8,10], color: "#e2b08c"},
      ],
      threshold: {
        line: {color: "red", width: 4},
        thickness: 0.75,
        value: 490,
      },
    },
    },];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 600, margin: { t: 0, b: 0 },
      paper_bgcolor: "#EBDC98"
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  });
}



