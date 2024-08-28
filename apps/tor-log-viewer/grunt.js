/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        globals:{
            target :'target',
            toolsPath : 'tools',
            appOutputScript: 'Application.js',
            windowsNode : '/tools/nodejs/bin/node.exe',
            linuxNode : '/tools/nodejs/bin/node'
        },
        pkg:'<json:package.json>',
        clean:['<config:globals.target>'], //grunt-contrib-clean
        version:{   // copies project's package descriptor to target and sets version
            srcFile:'<config:pkg>',
            destPath:'<config:globals.target>'
        },
        nexusResolver :
        {
            srcFile:'<config:pkg>',
            destPath:'<config:globals.target>',
            classifier: 'dev'  // decide if you want dev or prod version of this package.
            // some packages may be big and slow to download (eg> titan-dev)
        },
        npmInstall: {
            all: {
                windowsNode : '<%= globals.windowsNode %>',
                linuxNode : '<%= globals.linuxNode %>',
                npmScriptPath : '/tools/nodejs/lib/node_modules/npm/bin/npm-cli.js',
                npmArgument: ""
            },
            prod: {
                windowsNode : '<%= globals.windowsNode %>',
                linuxNode : '<%= globals.linuxNode %>',
                npmScriptPath : '/tools/nodejs/lib/node_modules/npm/bin/npm-cli.js',
                npmArgument: " --production"
            }
        },

        rjs: {
            windowsNode : '<%= globals.windowsNode %>',
            linuxNode : '<%= globals.linuxNode %>',
            rjsLib: 'node_modules/titan/node_modules/requirejs/bin/r.js',
            rjsConfig : ({
                baseUrl: '../target/src',
                optimize: 'none',
                resources: '.',
                paths: {
                    'Titan': 'empty:',
                    'template': '../../node_modules/titan/lib/requirejs/template',
                    'styles': '../../node_modules/titan/lib/requirejs/styles'
                },
                stubModules: ['template', 'styles'],
                name:'tor-log-viewer/Application',
                out:'../<%= globals.target %>/<%= globals.appOutputScript %>'
            }),
            tempConfig : '<%= globals.target %>/rjsTempConfig.js',
            srcPath : 'src/*',
            outputPath : '<%= globals.target %>/src/tor-log-viewer'
        },

        lint:{
            gruntjs: ['grunt.js'],
            sources:['src/**/*.js']
        },
        jshint: {      // options for lint task
            options: {
                sub : true,   // suppresses warnings about using [] notation.
                strict: false, // equivalent of sloppy in JSLINT.
                es5: false, // ES5 syntax
                ident: 4 // enforces indent spacing.
            },
            globals: { require : true }     // no globals allowed

        },
        prepareTest: {
            forJasmine: {
                winPath: '/<%= globals.toolsPath %>/jscoverage/jscoverage.exe',
                linuxPath: '/<%= globals.toolsPath %>/jscoverage/jscoverage',
                srcCode : 'src',
                jsCoverageTarget: '<%= globals.target %>',
                testResources: {
                    "node_modules/titan/tools/jasmine":"<%= globals.target %>/node_modules/titan/tools",
                    "node_modules/titan/titan-dev.js":"<%= globals.target %>/node_modules/titan",
                    "test":"<%= globals.target %>"

                }
            }
        },
        testJasmine: {
            unit: {
                phantomWinPath: '/<%= globals.toolsPath %>/phantomjs/bin/phantomjs.exe',
                phantomLinuxPath: '/<%= globals.toolsPath %>/phantomjs/bin/phantomjs',
                runnerPath : 'node_modules/titan/tools/jasmine/test-runner.js',
                reportsPath : '<%= globals.target %>/test/reports-unit',
                testIndex : '<%= globals.target %>/test/unit/index.html'
            },
            integration: {
                phantomWinPath: '/<%= globals.toolsPath %>/phantomjs/bin/phantomjs.exe',
                phantomLinuxPath: '/<%= globals.toolsPath %>/phantomjs/bin/phantomjs',
                runnerPath : 'node_modules/titan/tools/jasmine/test-runner.js',
                reportsPath : '<%= globals.target %>/test/reports-integration',
                testIndex : '<%= globals.target %>/test/integration/index.html'
            }

        },
        packageNPM :
        {
            prod: {
                packageDescriptor: '<%= globals.target %>/package.json',
                packageTarget: '<%= globals.target %>/package-prod/',
                packageResources: {
                    'target/Application.js':'',
                    'target/package.json':'',
                    'resources/*':'',
                    'config/app.json':''
                },
                removeDependencies: false
            }
        },
        min:{
            prod: {
                src: ['<%= globals.target %>/<%= globals.appOutputScript %>'],
                dest: '<%= globals.target %>/<%= globals.appOutputScript %>'
            }
        },
        uglify: {
            mangle: {toplevel: true},
            squeeze: {dead_code: false},
            codegen: {quote_keys: false}
        }
    });

//   to run: grunt.cmd taskName

// Developer Tasks (notice capital letters):
//    Version       ( clean version:bypass )
//    NexusResolver ( clean version:bypass nexusResolver ) // Not recommended for now
//    NpmInstall    ( clean version:bypass npmInstall:prod )
//    Rjs           ( clean version:bypass npmInstall:prod rjs )
//    Lint          ( clean version:bypass npmInstall:prod rjs lint )
//    PrepareTest   ( clean version:bypass npmInstall:prod rjs lint prepareTest )
//    Test          ( clean version:bypass npmInstall:prod rjs lint prepareTest:forJasmine testJasmine )
//    Package-dev   ( clean version:bypass npmInstall:prod rjs lint prepareTest:forJasmine testJasmine packageNPM:dev )
//    Package-prod  ( clean version:bypass npmInstall:prod rjs lint prepareTest:forJasmine testJasmine packageNPM:prod )
//    Package       ( clean version:bypass npmInstall:prod rjs lint prepareTest:forJasmine testJasmine packageNPM:dev )
//    Min           ( clean version:bypass npmInstall:prod rjs lint prepareTest:forJasmine testJasmine packageNPM:dev min)

// Shortcut to avoid updating dependencies:
//                  grunt clean version:bypass rjs lint prepareTest testJasmine packageNPM:prod

// Load additional tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-UI-tasks');
    grunt.task.loadTasks('./node_modules/grunt-UI-tasks/aliases/application');
};