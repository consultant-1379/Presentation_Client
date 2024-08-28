var webdriver = require("selenium-webdriverjs");
var expect = require('chai').expect;

var rest = require('../_api/rest');

// Load the configuration
var config = require('../config');

describe("Acceptance test for Search", function () {

    var driver, searchInput, apps, expectedCssProp, expectedCssValue, expectedPlaceholder;

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

        // Vars that describe criteria.
        expectedCssValue = "rgba(0, 169, 212, 1)";
        expectedCssProp = new Array(
            "border-top-color",
            "border-right-color",
            "border-bottom-color",
            "border-left-color"
        );

        expectedPlaceholder = "Search for an application";

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

    describe('Search application name.', function () {

        describe('EXECUTE: User is on the default Category page.', function () {

            it('VERIFY: The search box is highlighted and contains the text "Search for an application".', function (done) {

                expectedCssProp.forEach(function (x) {
                    searchInput.getCssValue(x).then(function (val) {
                        expect(val).to.equal(expectedCssValue);
                    })
                });

                searchInput.getAttribute("placeholder").then(function (val) {
                    expect(val).to.equal(expectedPlaceholder);
                    done();
                });
            });

            it('VERIFY: The search box contains the text "Search for an application or task" in grey font.', function (done) {

                searchInput.getAttribute("placeholder").then(function (val) {
                    expect(val).to.equal(expectedPlaceholder);
                    // Color of a placeholder depends on browser handling, therefore not testable here.
                    done();
                });
            });
        });

        describe('EXECUTE: Enter the name of an application: "con".', function () {

            var appName, appFullName, searchResultClass = "torLauncher-Search-results";

            beforeEach(function() {
                appName = apps[0].name;
                appFullName = appName + ' (' + apps[0].acronym + ')';
            });

            it('1.2.1 VERIFY: A list of suggested applications (6 apps) that match the search criteria are displayed as the name is entered.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('cif');
                var resultBox = driver.findElement(webdriver.By.className(searchResultClass));
                resultBox.findElements(webdriver.By.className("torLauncher-SearchItem")).then(function (val) {
                    expect(val.length).to.equal(2);
                    // TODO: COmpare this rather with list of apps specified in REST
                    done();
                });
            });

            it('VERIFY: The list of suggested applications is sorted alphabetically.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('oss');
                var names = new Array();
                var sortedNames = new Array();

                driver.findElements(webdriver.By.className('torLauncher-SearchItem-label')).then(function (href) {
                    href.forEach(function (x) {
                        x.getText().then(function (val) {
                            //console.log(val);
                            names.push(val);
                        })
                    });
                })
                    .then(function () {
                        sortedNames = names.sort();
                        expect(names).to.equal(sortedNames);
                        done();
                    });
            });

            it('VERIFY: The list is reduced as the search criteria becomes more specific.', function (done) {

                searchInput.clear();
                searchInput.sendKeys('cif');
                var resultBox = driver.findElement(webdriver.By.className(searchResultClass));
                resultBox.findElements(webdriver.By.className("torLauncher-SearchItem")).then(function (val) {
                    expect(val.length).to.equal(2);
                });

                searchInput.sendKeys(' Activity Manager');
                var resultBox = driver.findElement(webdriver.By.className(searchResultClass));
                resultBox.findElements(webdriver.By.className("torLauncher-SearchItem")).then(function (val) {
                    expect(val.length).to.equal(1);
                    done();
                });
            });

            it('VERIFY: Once the full application name is entered as the search criteria, only one matching application name is shown in the list..', function (done) {

                searchInput.clear();
                searchInput.sendKeys('CIF Activity Manager');
                var resultBox = driver.findElement(webdriver.By.className(searchResultClass));
                resultBox.findElements(webdriver.By.className("torLauncher-SearchItem")).then(function (val) {
                    expect(val.length).to.equal(1);
                    done();
                });
            });
        });
    });
});

