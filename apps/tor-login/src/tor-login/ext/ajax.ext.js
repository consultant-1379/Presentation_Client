require([
    'Titan'
], function (Titan) {

    Titan.extension(function (env) {

        Titan.utils.ajax = env['$'].ajax;

    })

});