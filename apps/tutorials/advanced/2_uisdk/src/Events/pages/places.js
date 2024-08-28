define([
    'Titan',
    './start/StartPlace',
    './User/UserPlace'
], function (Titan) {
    // "arguments" : An object (array alike) representing the arguments of executing function

    // arguments,1 will take all arguments except the first one
    return Titan.utils.getListFromArguments(arguments, 1);

});