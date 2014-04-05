function switchTheme(themeName) {
    $('link.theme').prop('disabled', true);
    $('link.theme.' + themeName).prop('disabled', false);
};

function saveCookie(key, value, months) {
    months = typeof months !== 'undefined' ? months : 4;
    var expiryDate = new Date();
    var expiryTime = expiryDate.getTime() + months * 30 * 24 * 60 * 60 * 1000; // Months months! This is a useful comment!
    expiryDate.setTime(expiryTime);
    document.cookie = // ONE cookie. Ah ah ah.
        key + '=' + value +
        '; expires=' + expiryDate.toUTCString() +
        '; path=/';
};
function getCookie(key) {
    var cookieRegex = new RegExp("(?:(?:^|.*;\\s*)" + key + "\\=\\s*([^;]*).*$)|^.*$");
    return document.cookie.replace(cookieRegex, '$1'); // Easier to get a matched group with replace than with match.
};

$(document).ready(function() {
    $('link.theme').slice(1).prop('disabled', true); // Turns out an attribute and a property aren't the same thing.
    $('link.default').prop('disabled', true); // Does anyone ever NOT have JS enabled?
    
    var cookiedTheme = getCookie('theme');
    if (cookiedTheme.length) {
        switchTheme(cookiedTheme);
    };
    
    $('.themebutton').click(function() {
        var curTheme = this.classList[1]
        switchTheme(curTheme);
        saveCookie('theme', curTheme);
    });
});
