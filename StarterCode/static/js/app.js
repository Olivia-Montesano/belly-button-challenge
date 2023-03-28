//Use the D3 library to read in samples.json from the "samples.json"
function main() {
   var selector = d3.select('#selDataset')
   d3.json("samples.json").then(
      (data) => {
         var sampleName = data.names;
         sampleName.forEach ((sample)=>{
            selector.append('option').text(sample).property('value', sample);
         })
         console.log(data);
         var initSample = sampleName[0];
         demoInfo(initSample);
         buildCharts(initSample);
      })
};
main();



function optionChanged(newSample) {
   console.log(newSample);
   demoInfo(newSample);
   buildCharts(newSample); 
};



function demoInfo(sample) {
   d3.json('samples.json').then((data) => {
         var metaData = data.metadata;
         console.log(metaData);
         var metaArray = metaData.filter(sampleObj=>sampleObj.id==sample);
         var metaResult = metaArray[0];
         var panel = d3.select('#sample-metadata');
         panel.html('');
         Object.entries(metaResult).forEach(([key, value])=>{
            panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
         })
      })
};



function buildCharts(sample) {
   d3.json("samples.json").then(
      (data) => {
         let sampleValues=data.samples.filter(obj=>obj.id===sample)[0].sample_values;
         console.log(sampleValues);
         let otuIds=data.samples.filter(obj=>obj.id==sample)[0].otu_ids;
         console.log(otuIds);
         let otuLabels=data.samples.filter(obj=>obj.id==sample)[0].otu_labels;
         console.log(otuLabels);
         
         let barInfo=[{
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIds.slice(0,10).map(otu=> `OTU ${otu}`).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            orientation: 'h',
            type: 'bar'
         }]

         Plotly.newPlot('bar', barInfo)
// Create a bubble chart that displays each sample.
         let bubbleData= [{
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
               color: otuIds,
               size: sampleValues
            }
         }]

         let layout = {
            xaxis: {
               title: {
                  text: 'OTU ID',
               },
            },
         }
         Plotly.newPlot('bubble', bubbleData, layout);
      })};




//
//Create a horizontal bar chart with a dropdown menu to display the 
 //top 10 OTUs found in that individual. 




// Create a bubble chart that displays each sample.



//Creating a gauge
// var data = [
//    {
//      type: "indicator",
//      mode: "gauge+number+delta",
//      value: 420,
//      title: { text: "Speed", font: { size: 24 } },
//      delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//      gauge: {
//        axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
//        bar: { color: "darkblue" },
//        bgcolor: "white",
//        borderwidth: 2,
//        bordercolor: "gray",
//        steps: [
//          { range: [0, 250], color: "cyan" },
//          { range: [250, 400], color: "royalblue" }
//        ],
//        threshold: {
//          line: { color: "red", width: 4 },
//          thickness: 0.75,
//          value: 490
//        }
//      }
//    }
//  ];
 
//  var layout = {
//    width: 500,
//    height: 400,
//    margin: { t: 25, r: 25, l: 25, b: 25 },
//    paper_bgcolor: "lavender",
//    font: { color: "darkblue", family: "Arial" }
//  };
 
//  Plotly.newPlot('myDiv', data, layout);
 