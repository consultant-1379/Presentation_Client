define([
    'Titan'
], function (Titan) {

    Titan.extension(function(env) {
        Titan.bind = env._.bind;
        Titan.ajax =  env.$.ajax;
    });

});