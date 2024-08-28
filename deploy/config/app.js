var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();

//noinspection JSValidateTypes
app.configure(function () {
    app.set('port', 8080);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hjs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.post('/action', function (req, res) {

    var params = req.body.params,
        meta = {
            name: 'web',
            version: '0.0.2',
            params: req.body.params,
            dependencies: req.body.apps
        };

    var fs = require('fs');
    fs.writeFile("package.json", JSON.stringify(meta));
    fs.writeFile("params.properties", 'REMOTE_HOST=' + params.REMOTE_HOST + "\r\n" + 'REMOTE_PATH=' + params.REMOTE_PATH);

    var exec = require('child_process').exec;

    exec('ant', function (error, stdout) {
        res.render('log', {
            results: error || stdout
        });
    });

});

function getJson(url, callback) {
    http.get(url, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            var json = JSON.parse(data);
            callback(json);
        });

    }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });

}





app.get('/', function (req, res) {

    var apps = [];
    var options = {
        host: '150.132.76.214',
        port: 5900,
        path: '/registry/_design/app/_view/listAll'
    };

    getJson(options, function (json) {
        var rows = json['rows'];

        for (var i = 0; i < rows.length; i++) {
            var value = rows[i]['value'];
            if (value['name'] && value['name'] != 'torContainer' && value['name'] != 'skeleton') {
                var version = value['dist-tags']['latest'];
                var app = value['versions'][version];
                var dependencies = app['dependencies'];
                if (dependencies && dependencies['jscore'] && dependencies['jscore'] == '0.1.8') {
                    var meta = {
                        name: app['name'],
                        namespace: app['name'],
                        versions: [version]
                    };
                    apps.push(meta);
                }
            }
        }

        res.render('index', {
            apps: apps
        });
    });





});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
