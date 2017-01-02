'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.


var mainWindow = null;

app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		'width': 800,
		'height': 600,
		'minWidth': 360,
		'minHeight': 300,
		'icon': __dirname + '/images/icon.png',
		'frame': false,
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
