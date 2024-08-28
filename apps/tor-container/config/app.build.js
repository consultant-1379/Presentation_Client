({
    baseUrl: '../src',
    dir: '../build/temp',
    optimize: 'none',
    resources: 'resources',
    paths: {
        'Titan': 'empty:',
        'template': '../node_modules/titan/lib/requirejs/template',
        'styles': '../node_modules/titan/lib/requirejs/styles'
    },
    stubModules: ['template', 'styles'],
    modules: [
        {
            name: 'torContainer/Application'
        }
    ]
})