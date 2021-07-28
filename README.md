# plotly_chart
Creating an interactive bacteria webpage using JavaScript and Plotly
## Overview:
In this challenge we were given the task to use JavaScript and plotly to create a webpage  dashboard to display data of belly button bacteria in an interactive chart. Plotly is a powerful visualization tool that helps present data easily using JavaScript and HTML. Plotly can be used with python as well; however using it with JavasScript makes it easier to create webpages especially since you can use the library via a link and don't have to import any external modules.   

## Purpose:
The purpose of this challenge is create a dashboard for volunteers to see how many times a week they should be washing their belly buttons and metadata information such as belly button bacteria type. We were asked to present this information on a web page and use plotly to give a pretty visualization for the potential users.  

## Resources
* Data Source: 
samples.json
* Software: 
VSCode 1.58.2
Node.js 14.16.0
Bootstrap 4.0.0

## Analysis:
### Overview of Analysis:
There wasn't so much analysis for this challenge as there were more analysis of the JavaScript techniques of reading data from a JSON file and translating that into interactive charts. Just from looking at the bar chart, we can see that people who don't wash their belly buttons often will have more bacteria which is to be expected.  

### Results:
The results of this challenge was a webpage dashboard that hosts 3 plots: a gauge, a bar chart, and a bubble chart and a section for metadata. Each chart displayed it's own unique information. Below is the dashboard overview. 

![Dashboard Overview](https://github.com/lo7kyle/UFOs/blob/main/static/images/data.PNG) 


I next displayed the meta data in the same line as some belly button washing information and a link to the National Geographic website for more belly button bacteria information. I also found fitting to have the gauge share the same row as the information. For the metadata aspect of this challenge we were given a lot of hints throught the module. This is done by using the d3 library and updating the page on change.

``` html
<select id="selDataset" onchange="optionChanged(this.value)"></select>
        </div>
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Demographic Info</h3>
          </div>
          <div id="sample-metadata" class="panel-body"></div>
```

![Belly Button Washing](https://github.com/lo7kyle/UFOs/blob/main/static/images/home-button.PNG) 

At the bottom of the dashboard I had the bar chart and bubble chart where it showed the number of bacteria found and per sample. In this section we were asked to create a drop down menu so that the users may choose which chart they want to read. This is probably so that  users will not be overwhelemed with information. I personally would rather have the option to choose to see both or just 1. Maybe a checkbox and have both boxes initially checked and depending on which box is checked will have the charts displayed. 

![Belly Button Bubble](https://github.com/lo7kyle/UFOs/blob/main/static/images/home-button.PNG) 
![Belly Button Bar](https://github.com/lo7kyle/UFOs/blob/main/static/images/home-button.PNG) 

Similarly to using the select on change with the metadata, we are using the d3 library, but this time we will be selecting base on the option value. 

``` html
<select id = "charts">
        <option value="bubbleChart">Bubble Chart</option>
        <option value="barChart">Bar Chart</option>
      </select>
      <div id="bar"></div>
      <div id="bubble"></div>
      </div>
```

This part of the challenge took me a while to figure out. I felt like the code i wrote is not the most effecient way of doing this, but it was my own logical way of thinking it and it works.  


```js
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
````


### Summary:
In summary this challenge was extremely informational, and I struggled a lot with syntax. I am still very unfamiliar with HTML, and I had to refer to my old challenge and exercises. I used Google a lot for the syntax for JavaScript especially during the for loop through the object because I initially used Object.entries to get the values, but forgot that I already have the data in an array format. I felt proud of myself of being able to implement the drop down list since I struggled a lot with it, but I do feel like it has helped me with my thought process of coding. There were times when my index.html page would not load and that was because I was missing a few semi-colons. 
