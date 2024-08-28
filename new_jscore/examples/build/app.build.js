exports = {
    baseUrl: 'src',
    dir: 'temp',
    optimize: 'none',
    modules: [
        {name: 'apps/first'},
        {name: 'apps/second'}
    ],
    removeCombined: true,
    // version 2.1.6 required
    onModuleBundleComplete: function (data) {
        var crypto = require.nodeRequire('crypto'),
            fs = require.nodeRequire('fs');

        this.modules.forEach(function (module) {
            if (module.name == data.name) {

                var self = this,
                    shasum = crypto.createHash('md5'),
                    sourceFileName = module._buildPath,
                    sourceStream = fs.ReadStream(sourceFileName);

                sourceStream.on('data', function (data) {
                    shasum.update(data);
                });

                sourceStream.on('end', function () {
                    var md5 = shasum.digest('hex'),
                        jsModuleCode = "define('" + md5 + "', ['" + module.name + "'], function(module) { return module; });",
                        targetStream = fs.createWriteStream(self.dir + md5 + '.js'),
                        sourceStream = fs.createReadStream(sourceFileName);

                    sourceStream.pipe(targetStream);

                    sourceStream.on('end', function () {

                        fs.appendFileSync(self.dir + md5 + '.js', jsModuleCode);

                        console.log(md5 + '.js was created');

                        var configFileName = self.dir + 'app.nocache.js',
                            configData = fs.readFileSync(configFileName, 'utf8');

                        configData = configData.replace("entryPoint: '" + module.name + "'", "entryPoint: '" + md5 + "'");

                        fs.writeFileSync(configFileName, configData, 'utf8');

                        fs.unlinkSync(sourceFileName);

                    });

                });

            }
        }, this);
    }
}