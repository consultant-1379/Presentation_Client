define([
    'Titan',
    './topBar/TopBar'],
    function (Titan, TopBar) {
        return Titan.Application.extend({
            namespace: 'TorMegamenu',
            start: function () {
                var topBar = Titan.create(TopBar, this);
                 this.container.addWidget(topBar);
            }
        });
    });