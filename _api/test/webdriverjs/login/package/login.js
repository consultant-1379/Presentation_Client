exports = module.exports = {

    setDependencies: setDependencies,
    login: login,
    amIonLogin: amIonLogin


};

var webdriver, driver, config;

function setDependencies(webdrv, drv, conf){
    webdriver = webdrv,
    driver = drv;
    config = conf;
};

function amIonLogin(url) {
    return url.indexOf(config.app.domain + "login/?goto=") ==0;
};

function login(username, password){
    driver.findElement(webdriver.By.name('IDToken1')).sendKeys(username);
    driver.findElement(webdriver.By.name('IDToken2')).sendKeys(password);
    return driver.findElement(webdriver.By.id('submit')).click();
};

