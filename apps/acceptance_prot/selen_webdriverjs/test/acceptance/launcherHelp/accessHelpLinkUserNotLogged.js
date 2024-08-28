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

        done();
    });

    after(function (done) {
        driver.quit()
            .then(function () {
                done();
            });
    });

    describe('Access help link (user not logged).', function () {

        var amIOnLogin = false;

        beforeEach(function (done) {
            driver.get(config.app.url + "/apps/#dmsHelp/app").then(function () {

                driver.getCurrentUrl().then(function(url){
                    url = url.substring(0,44);
                    amIOnLogin = url === "http://ftuidmo.athtem.eei.ericsson.se/login/";
                    done();
                });
            });
        });

        describe('EXECUTE: User accessed help url directly.', function () {

            it('VERIFY: User is reverted to OSS login page.', function (done) {
                expect(amIOnLogin).to.be.true;
                done();
            });
        });

        describe('EXECUTE: User accessed help url directly, was redirected to login screen and logged into OSS.', function () {

            it('VERIFY: Help main page is displayed.', function (done) {
                expect(amIOnLogin).to.be.true;

                driver.findElement(webdriver.By.name('IDToken1')).sendKeys(config.user.username);
                driver.findElement(webdriver.By.name('IDToken2')).sendKeys(config.user.password);
                driver.findElement(webdriver.By.id('submit')).click();

                driver.getCurrentUrl().then(function(url){

                    expect(url).to.equal("http://ftuidmo.athtem.eei.ericsson.se/apps/#dmsHelp/app/tor-launcher");
                    done();
                });
            });
        });
    });
});

