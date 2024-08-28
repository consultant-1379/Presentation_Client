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

        driver.sleep(200);   // for firefox!

        searchResultClass = "torLauncher-Search-results_highlighted_true";

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

    describe('Search variation.', function () {

        describe('EXECUTE: In the search box enter text and then move the cursor to the middle of the text and update/delete the text.', function () {

            it('VERIFY: The list of applications matching the search criteria is updated as the user updates/deletes text. ', function (done) {

                searchInput.clear();
                searchInput.sendKeys('o');

                driver.findElements(webdriver.By.className(searchResultClass)).then(function (val) {

                    expect(val.length).to.equal(0);
                });

                searchInput.sendKeys('s');

                var resultBox = driver.findElement(webdriver.By.className(searchResultClass));
                resultBox.findElements(webdriver.By.className("torLauncher-SearchItem")).then(function (val) {

                    expect(val.length).to.equal(7);
                });

                searchInput.sendKeys('\u0008');

                driver.findElements(webdriver.By.className(searchResultClass)).then(function (val) {

                    expect(val.length).to.equal(0);
                    done();
                });


            });
        });
    });
});

