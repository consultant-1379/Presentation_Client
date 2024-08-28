var webdriver = require("selenium-webdriverjs");
var expect = require('chai').expect;

var rest = require('../_api/rest');

// Load the configuration
var config = require('../config');

describe("Acceptance test for Launcher Search", function () {

    var driver, searchInput, apps;

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

        // Global vars handling actual screen elements.
        searchInput = driver.findElement(webdriver.By.className('torLauncher-Search-input'));

        // Get the cookies and then applications that will be used in this test
        driver.manage().getCookies().then(function (cookies) {
            rest.getApps(cookies, function(err, result) {
                if(err) {
                    console.log(err);
                }

                apps = result;

                done();
            });
        });
    });

    after(function (done) {
        driver.quit()
            .then(function () {
                done();
            });
    });

    describe('Clear search items.', function () {

        describe('EXECUTE: Enter just one character in the search box.', function () {

            it('VERIFY: A close icon appears to the right within the search box.', function (done) {

                searchInput.clear();

                var searchHolder = driver.findElement(webdriver.By.className("torLauncher-Search-holder"));
                var closeIcon = searchHolder.findElement(webdriver.By.className("torLauncher-Search-cancel"));
                closeIcon.isDisplayed().then(function (val) {
                    expect(val).to.be.false;
                });

                searchInput.sendKeys('x');
                searchHolder = driver.findElement(webdriver.By.className("torLauncher-Search-holder"));
                var closeIcon = searchHolder.findElement(webdriver.By.className("torLauncher-Search-cancel"));
                closeIcon.isDisplayed().then(function (val) {
                    expect(val).to.be.true;
                    done();
                });
            });
        });

        describe('EXECUTE: Press the Close icon.', function () {

            it('VERIFY: The character that was entered is deleted.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('c');

                driver.findElement(webdriver.By.className("torLauncher-Search-cancel")).click();

                // where is "c" ?
                searchInput.getAttribute("value").then(function (val) {
                    expect(val).to.be.empty;
                    done();
                });
            });

            it('VERIFY: The Close icon is no longer shown.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('c');

                var closeIcon = driver.findElement(webdriver.By.className("torLauncher-Search-cancel"));

                closeIcon.getCssValue("display").then(function (val) {
                    expect(val).to.not.equal("none");
                });

                closeIcon.click();

                closeIcon.getCssValue("display").then(function (val) {
                    expect(val).to.equal("none");
                    done();
                });
            });
        });

        describe('EXECUTE: Enter a mix of characters (letters, numbers, spaces, upper and lower case, special characters) in the search box and press the Close icon.', function () {

            it('VERIFY: All the characters entered are deleted.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('xXyYZz!"£$%^&*()_+~@?><|:;#[]¬=-');

                driver.findElement(webdriver.By.className("torLauncher-Search-cancel")).click();

                // is input empty?
                searchInput.getAttribute("value").then(function (val) {
                    expect(val).to.be.empty;
                    done();
                });
            });

            it('VERIFY: The Close icon is no longer shown.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('xXyYZz!"£$%^&*()_+~@?><|:;#[]¬=-');

                var closeIcon = driver.findElement(webdriver.By.className("torLauncher-Search-cancel"));

                closeIcon.getCssValue("display").then(function (val) {
                    expect(val).to.not.equal("none");
                });

                closeIcon.click();

                closeIcon.getCssValue("display").then(function (val) {
                    expect(val).to.equal("none");
                    done();
                });
            });
        });


        describe('EXECUTE: Enter the name of an application in the search box.and press the X icon.', function () {

            var appName, appFullName;

            beforeEach(function() {
                appName = apps[0].name;
                appFullName = appName + ' (' + apps[0].acronym + ')';
            });

            it('VERIFY: All the characters entered are deleted.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('Admin-app2');

                driver.findElement(webdriver.By.className("torLauncher-Search-cancel")).click();

                // is input empty?
                searchInput.getAttribute("value").then(function (val) {
                    expect(val).to.be.empty;
                    done();
                });
            });

            it('VERIFY: The Close icon is no longer shown.', function (done) {

                searchInput.clear();
                searchInput.sendKeys(appName);

                var closeIcon = driver.findElement(webdriver.By.className("torLauncher-Search-cancel"));

                closeIcon.getCssValue("display").then(function (val) {
                    expect(val).to.not.equal("none");
                });

                closeIcon.click();

                closeIcon.getCssValue("display").then(function (val) {
                    expect(val).to.equal("none");
                    done();
                });
            });

            it('VERIFY: The application is removed from the search list.', function (done) {

                searchInput.clear();
                searchInput.sendKeys(appName);

                var closeIcon = driver.findElement(webdriver.By.className("torLauncher-Search-cancel"));
                var appResult = driver.findElement(webdriver.By.className('torLauncher-SearchItem-label'));


                appResult.getText().then(function (hrefVal) {
                    expect(hrefVal).to.equal(appFullName);
                });

                closeIcon.click().then(function () {
                    driver.findElements(webdriver.By.className('torLauncher-SearchItem-label')).then(function (href) {
                        expect(href.length).to.equal(0);
                        done();
                    })
                });
            });
        });
    });
});

