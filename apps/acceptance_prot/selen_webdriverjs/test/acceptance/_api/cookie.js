exports = module.exports = {
    full: function (cookies) {
        var result = [];

        if (Array.isArray(cookies)) {
            cookies.forEach(function (cookie) {
                result.push(linearize(cookie));
            });
        } else {
            result.push(linearize(cookies));
        }

        return result;
    },
    simple: function (cookies) {
        var result = [];

        if (Array.isArray(cookies)) {
            cookies.forEach(function (cookie) {
                cookie = simplify(cookie);
                result.push(linearize(cookie));
            });
        } else {
            cookies = simplify(cookies);
            result.push(linearize(cookies));
        }

        return result;
    }
};

function simplify(cookie) {
    delete cookie.domain;
    delete cookie.path;
    delete cookie.expiry;
    delete cookie.secure;

    return cookie;
}

function linearize(cookie) {
    var result = '';

    if (cookie.name) {
        result += cookie.name;

        result += '=';

        if (cookie.value) {
            result += cookie.value;
        } else {
            console.error('Cookie does not contain value');
            return;
        }
    } else {
        console.error('Cookie does not contain name');
        return;
    }

    if (cookie.domain) {
        result += '; Domain=' + cookie.domain;
    }

    if (cookie.path) {
        result += '; Path=' + cookie.path;
    }

    if (cookie.expiry) {
        var date = new Date(cookie.expiry);
        result += '; Expires=' + date.toGMTString();
    }

    if (cookie.secure) {
        result += '; Secure';
    }

    return result;
}