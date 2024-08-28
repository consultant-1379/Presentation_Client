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
        driver.get(config.app.url + "/apps/#dmsHelp/app");
        driver.findElement(webdriver.By.name('IDToken1')).sendKeys(config.user.username);
        driver.findElement(webdriver.By.name('IDToken2')).sendKeys(config.user.password);
        driver.findElement(webdriver.By.id('submit')).click().then(function () {
            done();
        });
    });

    after(function (done) {
        driver.quit()
            .then(function () {
                done();
            });
    });

    describe('Help Content.', function () {

        describe('EXECUTE: Click on each section from left side menu (including home).', function () {

            it('VERIFY: Each section from the menu provides content to the page when clicked.', function (done) {

                driver.get(config.app.url + "/apps/#dmsHelp/app/tor-launcher")

                // Count number of links in the menu.
                driver.findElements(webdriver.By.className('dmsHelp-Navigation-item')).then(function (links) {

                    var i = 0;

                    // For each menu item:
                    links.forEach(function () {

                        // Find all menu items in this iteration.
                        driver.findElements(webdriver.By.className('dmsHelp-Navigation-item')).then(function (menuItems) {

                            // Find next menu item.
                            var menuItem = menuItems[Object.keys(menuItems)[i]];

                            // Find link inside the menu item & click it.
                            menuItem.findElement(webdriver.By.className("dmsHelp-Navigation-itemLink")).click();
                            driver.findElement(webdriver.By.className("dmsHelp-Content-header")).getText().then(function (heading) {

                                // Get visible text from menu item.
                                menuItem.getText().then(function (txt) {
                                    if (i === 1) {
                                        expect(heading).to.equal("OSS Application Launcher");
                                    } else {
                                        expect(heading).to.equal(txt);
                                    }
                                });
                            });
                            i++;
                        });
                    });
                    done();
                });
            });
        });
    });
});

