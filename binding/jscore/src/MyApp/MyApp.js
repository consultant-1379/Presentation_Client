define([
    "jscore/core",
    "./regions/MyRegion/MyRegion",
    "./regions/MyRegion2/MyRegion2",
    "./regions/MyRegion3/MyRegion3",
    "./regions/MyRegion4/MyRegion4",
    "./MyAppView"
], function(core, MyRegion, MyRegion2, MyRegion3, MyRegion4, View) {

    return core.App.extend({

        View: View,

        onStart: function() {
            this.region1 = new MyRegion({context: this.getContext()});
            this.region1.start(this.getElement().find('.eaMyApp-myRegion1Holder'));

            this.region2 = new MyRegion2({context: this.getContext()});
            this.region2.start(this.getElement().find('.eaMyApp-myRegion2Holder'));

            this.region3 = new MyRegion3({context: this.getContext()});
            this.region3.start(this.getElement().find('.eaMyApp-myRegion3Holder'));

            this.region4 = new MyRegion4({context: this.getContext()});
            this.region4.start(this.getElement().find('.eaMyApp-myRegion4Holder'));
        }

    });

});
