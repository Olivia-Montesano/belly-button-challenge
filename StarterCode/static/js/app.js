//Use the D3 library to read in samples.json from the "samples.json"
//const "samples.json" = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
      //create a then function to get to samples data, sort, and slice top 10

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
         var metaData = data.metadata;
         console.log(metaData);
         var metaArray = metaData.filter(sampleObj=>sampleObj.id==sample);
         var metaResult = metaArray[0];
         var wfreq = metaResult.wfreq;

      console.log(data)
      var samples = data.samples;
      console.log(samples);
      //var otu_ids = samples.filter(samples.otu_ids==otu_ids);
      // console.log(otu_ids)
   })};


//
//Create a horizontal bar chart with a dropdown menu to display the 
 //top 10 OTUs found in that individual. 
