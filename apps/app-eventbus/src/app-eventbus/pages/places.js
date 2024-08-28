define([
    'Titan',
    './main/MainPlace',
    './second/SecondPlace'
], function (Titan) {

    return Titan.utils.getListFromArguments(arguments, 1);

});