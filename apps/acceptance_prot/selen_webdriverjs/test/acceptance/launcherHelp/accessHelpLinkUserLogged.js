var webdriver = require("selenium-webdriverjs");
var expect = require('chai').expect;

var rest = require('../_api/rest');

// Load the configuration
var config = require('../config');

describe("Acceptance test for Launcher Help", function () {

    var driver;

    before(function (done) {
        this.timeout(config.testRunner.beforeHookTimeout);

        // Setup browser driver.
        driver = new webdriver.Builder().
            usingServer(config.testRunner.hubUrl).
            withCapabilities({
                'browserName': config.testRunner.browser,
                'version': '',
                'platform': 'ANY',
                'javascriptEnabled': true
            }).build();

        driver.manage().timeouts().implicitlyWait(1000);

        // Open webs address
        driver.get(config.app.url);
        driver.findElement(webdriver.By.name('IDToken1')).sendKeys(config.user.username);
        driver.findElement(webdriver.By.name('IDToken2')).sendKeys(config.user.password);
        driver.findElement(webdriver.By.id('submit')).click().then(function(){
            done();
        });
    });

    after(function (done) {
        driver.quit()
            .then(function () {
                done();
            });
    });

    describe('Access help link (user logged).', function () {

        describe('EXECUTE: Using browser address bar navigate directly to launcher help url.', function () {

            it('VERIFY: Launcher help main page is displayed.', function (done) {

                driver.get(config.app.url+ "/apps/#dmsHelp/app/tor-launcher").then(function() {

                    driver.getCurrentUrl().then(function(url) {
                        expect(url).to.equal("http://ftuidmo.athtem.eei.ericsson.se/apps/#dmsHelp/app/tor-launcher");
                        done();
                    });
                });
            });
        });
    });
});

