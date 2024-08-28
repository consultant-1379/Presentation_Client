define([
    './base/d3',
    './main',
    '../../ext/utils/base/underscore'
], function (d3, Drawing, _) {


    var Pie = Drawing.extend({
        start: function (parent) {
            this.setElement(parent);
            var color,
                settings = {
                    w: 300,                        //width
                    h: 300,                            //height
                    r: {
                        inner: 0,
                        outer: 100
                    },
                    color: 'category20c',
                    fontStyle: {
                        'fill': '#fff',
                        'font-size': '18px'
                    },
                    data: [
                        {"label": "one", "value": 20},
                        {"label": "two", "value": 40},
                        {"label": "three", "value": 30},
                        {"label": "four", "value": 10}
                    ]
                }

            _.extend(settings, this.options);

            if (_.isString(settings.color) === true) {
                color = d3.scale[settings.color]();

            }
            else {
                color = function (i) {
                    return settings.color[i];
                }

            }
            var el = this.__select();

            var vis = el.append("svg:svg")              //create the SVG element inside the <element>
                .data([settings.data])                   //associate our data with the document
                .attr("width", settings.w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
                .attr("height", settings.h)
                .append("svg:g")                //make a group to hold our pie chart
                .attr("transform", "translate(" + settings.r.outer + "," + settings.r.outer + ")")    //move the center of the pie chart from 0, 0 to radius, radius

            var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
                .outerRadius(settings.r.outer)
                .innerRadius(settings.r.inner);

            var pie = d3.layout.pie()           //this will create arc data for us given a list of values
                .value(function (d) {
                    return d.value;
                });    //we must tell it out to access the value of each element in our data array
            var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
                .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
                .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
                .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

            arcs.append("svg:path")
                .attr("fill", function (d, i) {
                    return color(i);
                }) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

            arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function (d) {                    //set the label's origin to the center of the arc
                    //we have to make sure to set these before calling arc.centroid
                    d.innerRadius = settings.r.inner;
                    d.outerRadius = settings.r.outer;
                    return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
                })
                .attr("text-anchor", "middle") //center the text on it's origin
                .style(settings.fontStyle)
                .text(function (d, i) {
                    return settings.data[i].label;
                });        //get the label from our original data*/


            this.onStart();
        }
    });


    return Pie;
});