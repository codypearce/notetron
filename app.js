var Quill = require('quill')
var editor = new Quill('#editor', {
	modules: {
		toolbar: {container: '#toolbar'},
		'image-tooltip': true,
		'link-tooltip': true
	},
	theme: 'snow'

});

// Save and Load files

var fs = require('fs');
var remote = require('electron').remote;
var dialog = remote.require('electron').dialog;

var loadedfs;

function saveFile() {
    if(!loadedfs) {
        dialog.showSaveDialog({ filters: [
						{ name: 'txt', extensions: ['txt'] },
            { name: 'html', extensions: ['html'] },
        ]}, function(filename) {
            if(filename === undefined) return;
            writeToFile(editor, filename);
        });
    }
    else {
        writeToFile(editor, loadedfs);
    }
}

function loadFile() {
    dialog.showOpenDialog({ filters: [
        { name: 'txt', extensions: ['txt', 'html'] },
				{ name: 'html', extensions: ['html', 'txt'] },
    ]}, function(filenames) {
        if(filenames === undefined) return;
        var filename = filenames[0];
        readFromFile(editor, filename);
        loadedfs = filename;
    })
}

function writeToFile(editor, filename) {
    var html = editor.getHTML();
    fs.writeFile(filename, html, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

function readFromFile(editor, filename) {
    fs.readFile(filename, "utf-8", function(err, data) {
        if(err) {
            console.log(err);
        }
        editor.setHTML(data);
    });
}
