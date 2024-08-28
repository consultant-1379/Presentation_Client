var webdriver = require("selenium-webdriverjs");
var expect = require('chai').expect;

// Load the configuration
var config = require('../config');

describe("Acceptance test for Search", function () {

    var driver, searchInput, searchResultClass;

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

        // Open webs address and log in.
        driver.get(config.app.url);
        driver.findElement(webdriver.By.name('IDToken1')).sendKeys(config.user.username);
        driver.findElement(webdriver.By.name('IDToken2')).sendKeys(config.user.password);
        driver.findElement(webdriver.By.id('submit')).click();

        searchResultClass = "torLauncher-Search-results_highlighted_true";

        driver.sleep(200);   // for firefox!

        // Global vars handling actual screen elements.
        driver.findElement(webdriver.By.className('torLauncher-Search-input'))
            .then(function (input) {
                searchInput = input;
                done();
            });

    });

    after(function (done) {
        driver.quit()
            .then(function () {
                done();
            });
    });

    describe('Search not case sensitive.', function () {

        describe('EXECUTE: Start to enter the name of an application in the search box using all lower case characters.', function () {

            it('VERIFY: A list of suggested applications is displayed.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('oss');

                var resultBox = driver.findElement(webdriver.By.className(searchResultClass));
                resultBox.findElements(webdriver.By.className("torLauncher-SearchItem")).then(function (val) {
                    expect(val.length).to.equal(4);
                    done();
                });

            });
        });

        describe('EXECUTE: Start to enter the name of an application in the search box using all upper case characters.', function () {

            it('VERIFY: A list of suggested applications is displayed.', function (done) {
                searchInput.clear();
                searchInput.sendKeys('OSS');

                var resultBox = driver.findElement(webdriver.By.className(searchResultClass));
                resultBox.findElements(webdriver.By.className("torLauncher-SearchItem")).then(function (val) {
                    expect(val.length).to.equal(4);
                    done();
                });
            });

        });

        describe('EXECUTE: Start to enter the name of an application in the search box using a mix of lower and upper case characters.', function () {

            it('VERIFY: A list of suggested applications is displayed.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('OsS');

                var resultBox = driver.findElement(webdriver.By.className(searchResultClass));
                resultBox.findElements(webdriver.By.className("torLauncher-SearchItem")).then(function (val) {
                    expect(val.length).to.equal(4);
                    done();
                });
            });
        });
    });
});

