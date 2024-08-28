define([
    'Titan',
    './logviewer/LogViewerPlace',
    './logviewer/LogViewerParamsPlace'
], function (Titan) {
    // "arguments" : An object (array alike) representing the arguments to the currently
    // executing function
    return Titan.utils.getListFromArguments(arguments, 1);

});