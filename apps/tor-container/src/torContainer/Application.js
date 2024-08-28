define(['Titan', './pages/main/Main'], function (Titan, Main) {
    return Titan.Application.extend({
        namespace: 'torContainer',

        start: function(){
            var main = Titan.create(Main, this);

        }

    });
});