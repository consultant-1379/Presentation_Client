require.config({
    baseUrl: 'apps',
    map: {
        '*': {
            'jscore': '../lib/jscore-0.2'
        },
        'commonA': {
            'jscore': '../lib/jscore-0.2'
        },
        'commonB': {
            'jscore': '../lib/jscore-0.1'
        }
    },
    paths: {
        'text': '../lib/requirejs/text'
    }
});