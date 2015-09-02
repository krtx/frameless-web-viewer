var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');
var clipboard = require('clipboard');
var ipc = require('ipc');

require('crash-reporter').start();

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') app.quit();
})

app.on('ready', function () {
    var win = new BrowserWindow({
        frame: false,
        width: 800,
        height: 600
    });
    win.loadUrl('file://' + __dirname + '/index.html')

    win.on('closed', function () {
        win = null;
    });

    globalShortcut.register('Command+K', function () {
        if (win.isFocused()) {
            var url = clipboard.readText('selection');
            var match = url.match(/^https?:\/\/.+/);
            if (url.match(/^https?:\/\/.+/)) {
                win.webContents.send('Command+K', url);
            } else {
                win.webContents.send('Command+K')
            }
        }
    });
});

app.on('will-quit', function () {
    globalShortcut.unregisterAll();
})
