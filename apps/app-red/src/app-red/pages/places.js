define([
    'Titan',
    './main/places/MainPlace',
    './main/places/AnotherPlace'
], function (Titan) {

    return Titan.utils.getListFromArguments(arguments, 1);

});