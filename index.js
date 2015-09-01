var ipc = require('ipc');
var webview = document.getElementById('webview');
var inputBox = document.getElementById('inputBox');

ipc.on('Command+K', function (arg) {
    if (inputBox.style.visibility === 'visible') {
        inputBox.style.visibility = 'hidden';
    } else {
        if (arg) inputBox.value = arg;
        inputBox.style.visibility = 'visible';
        inputBox.focus();
    }
});

inputBox.addEventListener('keydown', function (ev) {
    if (ev.which === 13) {
        webview.src = inputBox.value;
        inputBox.style.visibility = 'hidden';
    }
});

inputBox.addEventListener('blur', function (ev) {
    inputBox.style.visibility = 'hidden';
});

webview.addEventListener('keydown', function (ev) {
    if (ev.which === 17) draggable();
    else if (ev.which === 8) {
        if (webview.canGoBack()) webview.goBack();
    }
});

webview.addEventListener('keyup', function (ev) {
    if (ev.which === 17) nodraggable();
})

var draggable = function () {
    webview.style['-webkit-app-region'] = 'drag';
    window.resizeBy(1, 0);
};

var nodraggable = function () {
    webview.style['-webkit-app-region'] = 'no-drag';
    window.resizeBy(-1, 0);
};
