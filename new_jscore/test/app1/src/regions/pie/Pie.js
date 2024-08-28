define([
    'jscore/0.2/core',
    './PieView',
    'jscore/0.1/ext/drawing/Pie',
    'jscore/0.1/ext/mvp/main'
], function (core, View, Pie, mvp) {

    return core.Region.extend({
        View: View,

        init: function () {
        },

        onStart: function () {
            var element = this.getElement();
            var modelA = new mvp.Model({"id": "one", "label": "one", "value": 20});

            var modelB = new mvp.Model({"id": "two", "label": "two", "value": 50});
            var modelC = new mvp.Model({"id": "three", "label": "three", "value": 10});
            var collection = new mvp.Collection([modelA, modelB, modelC]);


            modelA.setAttributes({"id": "four", "label": "sdfone", "value": 450});

            collection.removeModels([modelC]);

            collection.each(function (model) {
                // console.log(model.getAttribute('value'));
            });

            var pieBElement = element.find('.pieChartb');
            var pieAElement = this.pieaElement = element.find('.pieCharta');

            this.eid = pieAElement.on('dblclick', this.pieClickedAfter, this);

               console.log(this.eid);
            var options = {
                w: 400,    //width
                h: 400,    //height
                r: {
                    inner: 100,
                    outer: 200
                },
                fontStyle: {
                    'fill': '#fff',
                    'font-size': '18px'
                },
                color: 'category20b',
                data: [
                    {"label": "one", "value": 20},
                    {"label": "two", "value": 35},
                    {"label": "three", "value": 22},
                    {"label": "four", "value": 8},
                    {"label": "five", "value": 10},
                    {"label": "six", "value": 5}
                ]
            }
            var pieA = new Pie(options);
            pieA.start(pieAElement);

            var optionsA = {
                w: 200,                        //width
                h: 200,                            //height
                r: {
                    inner: 0,
                    outer: 100
                },
                fontStyle: {
                    'fill': '#e6550d',
                    'font-size': '12px'
                },
                color: ['#1f77b4', '#ff7f0e', '#2ca02c'],
                data: [
                    {"label": "test", "value": 70},
                    {"label": "Good", "value": 12},
                    {"label": "Very Good", "value": 18}
                ]
            }
            var pieB = new Pie(optionsA);
            pieB.start(pieBElement);
        },
        pieClicked: function () {

            this.a = (this.a !== undefined) ? this.a + 1 : 1;
            this.view.setText(this.a);
        },
        pieLived: function () {
            this.a = (this.a !== undefined) ? this.a - 1 : 1;
            this.view.setText(this.a);

        },
        pieClickedAfter: function () {
            console.log(this);
            this.pieaElement.off(this.eid);

        }
    });
});