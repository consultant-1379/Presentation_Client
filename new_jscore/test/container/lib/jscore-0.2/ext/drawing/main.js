define([
    '../dom/main',
    './base/d3'
], function (dom, d3) {

    var Canvas = function () {
        this.el = dom.parse('<div></div>');
        this.svg = d3.select(this.el).append('svg').attr('height', 50).attr('width', 50);
    };

    Canvas.prototype.circle = function (r, cx, cy) {
        return this.svg.append('circle')
            .style('stroke', 'gray')
            .style('fill', 'white')
            .attr('r', r)
            .attr('cx', cx || r)
            .attr('cy', cy || r);
    };

    Canvas.prototype.getElement = function () {
        return this.el;
    };

    return {
        Canvas: Canvas
    }

});