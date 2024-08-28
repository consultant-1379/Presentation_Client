var rest = require('restler');

// Load the configuration
var config = require('../config');

// Load the cookie magic
var cookie = require('./cookie');

exports = module.exports = {
    getApps: getApps
};

function getApps(cookies, cb) {
    var path = '/rest/apps';

    cookies = cookie.simple(cookies);
    // TODO: Feels like proper cookies handling should be in place (taking into account expires & path)

    rest.get(config.app.url + path, {
        headers: {
            'Cookie': cookies.join(', ')
        }
    }).on('complete', function (result) {
            if (result instanceof Error) {
                cb('Error: ' + result.message);
            } else if (result instanceof String) {
                cb('Error: Returned instance for ' + path + ' is not json');
            } else {
                cb(null, result);
            }
        });
}