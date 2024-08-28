({
    baseUrl: '../src',
    dir: '../build/temp',
    optimize: 'none',
    resources: '.',
    paths: {
        'Titan': 'empty:',
        'template': '../node_modules/titan/lib/requirejs/template',
        'styles': '../node_modules/titan/lib/requirejs/styles',
        'json': '../node_modules/titan/lib/requirejs/json'
    },
    stubModules: ['template', 'styles', 'json'],
    modules: [
        {
            name: 'app-red/Application'
        }
    ]
})