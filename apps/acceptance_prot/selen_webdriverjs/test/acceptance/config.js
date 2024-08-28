var testRunnerConfig = {
    hubUrl: 'http://localhost:4444/wd/hub',
    browser: 'firefox',
    beforeHookTimeout: 60000
}

var appConfig = {
    url: 'http://ftuidmo.athtem.eei.ericsson.se'
};

var userConfig = {
    username: 'joe',
    password: 'joe'
}

// Expose configuration as part of this module
exports = module.exports = {
    testRunner: testRunnerConfig,
    app: appConfig,
    user: userConfig
}