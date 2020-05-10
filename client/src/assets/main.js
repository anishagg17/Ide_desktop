/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/AppMain.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/Constants.ts":
/*!*********************************!*\
  !*** ./src/common/Constants.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The key name that is the channel of the IPC message..
 */
var IPCKey;
(function (IPCKey) {
    IPCKey["ShowOpenDialog"] = "ShowOpenDialog";
    IPCKey["ShowSaveDialog"] = "ShowSaveDialog";
    IPCKey["ShowMessageBox"] = "ShowMessageBox";
    IPCKey["ShowURL"] = "ShowURL";
})(IPCKey = exports.IPCKey || (exports.IPCKey = {}));


/***/ }),

/***/ "./src/main/AppMain.ts":
/*!*****************************!*\
  !*** ./src/main/AppMain.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __webpack_require__(/*! electron */ "electron");
const IPCEvents_1 = __webpack_require__(/*! ./IPCEvents */ "./src/main/IPCEvents.ts");
const WindowManager_1 = __webpack_require__(/*! ./WindowManager */ "./src/main/WindowManager.ts");
const MainMenu_1 = __webpack_require__(/*! ./MainMenu */ "./src/main/MainMenu.ts");
electron_1.app.name = 'Starter';
electron_1.app.on('ready', () => {
    ////////////////////////
    console.log('Initialize Application');
    ////////////
    WindowManager_1.createMainWindow();
    MainMenu_1.createMainMenu();
    IPCEvents_1.initializeIpcEvents();
});
//////////////////////
electron_1.app.on('quit', () => {
    console.log('Application is quit');
});
//////////
electron_1.app.on('window-all-closed', () => {
    ////////////////////////
    console.log('All of the window was closed.');
    ////////////
    IPCEvents_1.releaseIpcEvents();
    electron_1.app.quit();
});


/***/ }),

/***/ "./src/main/IPCEvents.ts":
/*!*******************************!*\
  !*** ./src/main/IPCEvents.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __webpack_require__(/*! electron */ "electron");
const Constants_1 = __webpack_require__(/*! ../common/Constants */ "./src/common/Constants.ts");
/**
 * Occurs when show of a file open dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showOpenDialog`.
 */
const onShowOpenDialog = async (ev, options) => {
    const win = electron_1.BrowserWindow.fromWebContents(ev.sender);
    if (win) {
        return electron_1.dialog.showOpenDialog(win, options);
    }
    else {
        throw new Error('Message sender window does not exist');
    }
};
/**
 * Occurs when show of a save dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showSaveDialog`.
 */
const onShowSaveDialog = async (ev, options) => {
    const win = electron_1.BrowserWindow.fromWebContents(ev.sender);
    if (win) {
        return electron_1.dialog.showSaveDialog(win, options);
    }
    else {
        throw new Error('Message sender window does not exist');
    }
};
/**
 * Occurs when show of a message box is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showMessageBox`.
 */
const onShowMessageBox = async (ev, options) => {
    const win = electron_1.BrowserWindow.fromWebContents(ev.sender);
    if (win) {
        return electron_1.dialog.showMessageBox(win, options);
    }
    else {
        throw new Error('Message sender window does not exist');
    }
};
/**
 * Occurs in a request to open URL in a shell
 * @param ev Event data.
 * @param itemPath Path of the target folder.
 */
const onShowURL = async (ev, url) => {
    return electron_1.shell.openExternal(url);
};
/** A value indicating that an IPC events has been initialized. */
let initialized = false;
/**
 * Initialize IPC events.
 */
exports.initializeIpcEvents = () => {
    if (initialized) {
        return;
    }
    initialized = true;
    electron_1.ipcMain.handle(Constants_1.IPCKey.ShowOpenDialog, onShowOpenDialog);
    electron_1.ipcMain.handle(Constants_1.IPCKey.ShowSaveDialog, onShowSaveDialog);
    electron_1.ipcMain.handle(Constants_1.IPCKey.ShowMessageBox, onShowMessageBox);
    electron_1.ipcMain.handle(Constants_1.IPCKey.ShowURL, onShowURL);
};
/**
 * Release IPC events.
 */
exports.releaseIpcEvents = () => {
    if (initialized) {
        electron_1.ipcMain.removeAllListeners(Constants_1.IPCKey.ShowOpenDialog);
        electron_1.ipcMain.removeAllListeners(Constants_1.IPCKey.ShowSaveDialog);
        electron_1.ipcMain.removeAllListeners(Constants_1.IPCKey.ShowMessageBox);
        electron_1.ipcMain.removeAllListeners(Constants_1.IPCKey.ShowURL);
    }
    initialized = false;
};


/***/ }),

/***/ "./src/main/MainMenu.ts":
/*!******************************!*\
  !*** ./src/main/MainMenu.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __webpack_require__(/*! electron */ "electron");
/**
 * Create a template for the menu.
 * @returns Template.
 */
const createTemplate = () => {
    const isMac = process.platform === 'darwin';
    return [
        ...(isMac
            ? [
                {
                    label: electron_1.app.name,
                    submenu: [
                        { role: 'about' },
                        { type: 'separator' },
                        { role: 'services' },
                        { type: 'separator' },
                        { role: 'hide' },
                        { role: 'hideothers' },
                        { role: 'unhide' },
                        { type: 'separator' },
                        { role: 'quit' }
                    ]
                }
            ]
            : []),
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' },
                ...(isMac
                    ? [
                        { type: 'separator' },
                        {
                            label: 'Speech',
                            submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
                        }
                    ]
                    : [])
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                //////////////////////////////
                { role: 'toggledevtools' },
                //////////////////
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            role: 'window',
            submenu: [
                ...(isMac
                    ? [
                        { role: 'close' },
                        { role: 'minimize' },
                        { role: 'zoom' },
                        { type: 'separator' },
                        { role: 'front' }
                    ]
                    : [{ role: 'minimize' }, { role: 'close' }])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        __webpack_require__(/*! electron */ "electron").shell.openExternal('https://electronjs.org');
                    }
                }
            ]
        }
    ];
};
/**
 * Create and set main menu.
 */
exports.createMainMenu = () => {
    const template = electron_1.Menu.buildFromTemplate(createTemplate());
    electron_1.Menu.setApplicationMenu(template);
};
exports.default = exports.createMainMenu;


/***/ }),

/***/ "./src/main/WindowManager.ts":
/*!***********************************!*\
  !*** ./src/main/WindowManager.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __webpack_require__(/*! electron */ "electron");
let mainWindow;
/**
 * Create a main window of application.
 */
exports.createMainWindow = () => {
    if (mainWindow) {
        return;
    }
    const window = new electron_1.BrowserWindow({
        width: 940,
        height: 700,
        minWidth: 480,
        minHeight: 320,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    window.on("closed", () => {
        mainWindow = null;
    });
    window.loadFile("assets/index.html");
};


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vQXBwTWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9JUENFdmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vTWFpbk1lbnUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vV2luZG93TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGlEQUFpRDs7Ozs7Ozs7Ozs7OztBQ1hyQztBQUNi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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyR2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBbUIsbUJBQU8sQ0FBQywwQkFBVTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkEscUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4vQXBwTWFpbi50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUga2V5IG5hbWUgdGhhdCBpcyB0aGUgY2hhbm5lbCBvZiB0aGUgSVBDIG1lc3NhZ2UuLlxuICovXG52YXIgSVBDS2V5O1xuKGZ1bmN0aW9uIChJUENLZXkpIHtcbiAgICBJUENLZXlbXCJTaG93T3BlbkRpYWxvZ1wiXSA9IFwiU2hvd09wZW5EaWFsb2dcIjtcbiAgICBJUENLZXlbXCJTaG93U2F2ZURpYWxvZ1wiXSA9IFwiU2hvd1NhdmVEaWFsb2dcIjtcbiAgICBJUENLZXlbXCJTaG93TWVzc2FnZUJveFwiXSA9IFwiU2hvd01lc3NhZ2VCb3hcIjtcbiAgICBJUENLZXlbXCJTaG93VVJMXCJdID0gXCJTaG93VVJMXCI7XG59KShJUENLZXkgPSBleHBvcnRzLklQQ0tleSB8fCAoZXhwb3J0cy5JUENLZXkgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBlbGVjdHJvbl8xID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xuY29uc3QgSVBDRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9JUENFdmVudHNcIik7XG5jb25zdCBXaW5kb3dNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9XaW5kb3dNYW5hZ2VyXCIpO1xuY29uc3QgTWFpbk1lbnVfMSA9IHJlcXVpcmUoXCIuL01haW5NZW51XCIpO1xuZWxlY3Ryb25fMS5hcHAubmFtZSA9ICdTdGFydGVyJztcbmVsZWN0cm9uXzEuYXBwLm9uKCdyZWFkeScsICgpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6ZSBBcHBsaWNhdGlvbicpO1xuICAgIC8vLy8vLy8vLy8vL1xuICAgIFdpbmRvd01hbmFnZXJfMS5jcmVhdGVNYWluV2luZG93KCk7XG4gICAgTWFpbk1lbnVfMS5jcmVhdGVNYWluTWVudSgpO1xuICAgIElQQ0V2ZW50c18xLmluaXRpYWxpemVJcGNFdmVudHMoKTtcbn0pO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZWxlY3Ryb25fMS5hcHAub24oJ3F1aXQnLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0FwcGxpY2F0aW9uIGlzIHF1aXQnKTtcbn0pO1xuLy8vLy8vLy8vL1xuZWxlY3Ryb25fMS5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnNvbGUubG9nKCdBbGwgb2YgdGhlIHdpbmRvdyB3YXMgY2xvc2VkLicpO1xuICAgIC8vLy8vLy8vLy8vL1xuICAgIElQQ0V2ZW50c18xLnJlbGVhc2VJcGNFdmVudHMoKTtcbiAgICBlbGVjdHJvbl8xLmFwcC5xdWl0KCk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZWxlY3Ryb25fMSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbmNvbnN0IENvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2NvbW1vbi9Db25zdGFudHNcIik7XG4vKipcbiAqIE9jY3VycyB3aGVuIHNob3cgb2YgYSBmaWxlIG9wZW4gZGlhbG9nIGlzIHJlcXVlc3RlZC5cbiAqIEBwYXJhbSBldiBFdmVudCBkYXRhLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBvZiBgZGlhbG9nLnNob3dPcGVuRGlhbG9nYC5cbiAqL1xuY29uc3Qgb25TaG93T3BlbkRpYWxvZyA9IGFzeW5jIChldiwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHdpbiA9IGVsZWN0cm9uXzEuQnJvd3NlcldpbmRvdy5mcm9tV2ViQ29udGVudHMoZXYuc2VuZGVyKTtcbiAgICBpZiAod2luKSB7XG4gICAgICAgIHJldHVybiBlbGVjdHJvbl8xLmRpYWxvZy5zaG93T3BlbkRpYWxvZyh3aW4sIG9wdGlvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXNzYWdlIHNlbmRlciB3aW5kb3cgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG59O1xuLyoqXG4gKiBPY2N1cnMgd2hlbiBzaG93IG9mIGEgc2F2ZSBkaWFsb2cgaXMgcmVxdWVzdGVkLlxuICogQHBhcmFtIGV2IEV2ZW50IGRhdGEuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIG9mIGBkaWFsb2cuc2hvd1NhdmVEaWFsb2dgLlxuICovXG5jb25zdCBvblNob3dTYXZlRGlhbG9nID0gYXN5bmMgKGV2LCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3Qgd2luID0gZWxlY3Ryb25fMS5Ccm93c2VyV2luZG93LmZyb21XZWJDb250ZW50cyhldi5zZW5kZXIpO1xuICAgIGlmICh3aW4pIHtcbiAgICAgICAgcmV0dXJuIGVsZWN0cm9uXzEuZGlhbG9nLnNob3dTYXZlRGlhbG9nKHdpbiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2Ugc2VuZGVyIHdpbmRvdyBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cbn07XG4vKipcbiAqIE9jY3VycyB3aGVuIHNob3cgb2YgYSBtZXNzYWdlIGJveCBpcyByZXF1ZXN0ZWQuXG4gKiBAcGFyYW0gZXYgRXZlbnQgZGF0YS5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgb2YgYGRpYWxvZy5zaG93TWVzc2FnZUJveGAuXG4gKi9cbmNvbnN0IG9uU2hvd01lc3NhZ2VCb3ggPSBhc3luYyAoZXYsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCB3aW4gPSBlbGVjdHJvbl8xLkJyb3dzZXJXaW5kb3cuZnJvbVdlYkNvbnRlbnRzKGV2LnNlbmRlcik7XG4gICAgaWYgKHdpbikge1xuICAgICAgICByZXR1cm4gZWxlY3Ryb25fMS5kaWFsb2cuc2hvd01lc3NhZ2VCb3god2luLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWVzc2FnZSBzZW5kZXIgd2luZG93IGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufTtcbi8qKlxuICogT2NjdXJzIGluIGEgcmVxdWVzdCB0byBvcGVuIFVSTCBpbiBhIHNoZWxsXG4gKiBAcGFyYW0gZXYgRXZlbnQgZGF0YS5cbiAqIEBwYXJhbSBpdGVtUGF0aCBQYXRoIG9mIHRoZSB0YXJnZXQgZm9sZGVyLlxuICovXG5jb25zdCBvblNob3dVUkwgPSBhc3luYyAoZXYsIHVybCkgPT4ge1xuICAgIHJldHVybiBlbGVjdHJvbl8xLnNoZWxsLm9wZW5FeHRlcm5hbCh1cmwpO1xufTtcbi8qKiBBIHZhbHVlIGluZGljYXRpbmcgdGhhdCBhbiBJUEMgZXZlbnRzIGhhcyBiZWVuIGluaXRpYWxpemVkLiAqL1xubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4vKipcbiAqIEluaXRpYWxpemUgSVBDIGV2ZW50cy5cbiAqL1xuZXhwb3J0cy5pbml0aWFsaXplSXBjRXZlbnRzID0gKCkgPT4ge1xuICAgIGlmIChpbml0aWFsaXplZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBlbGVjdHJvbl8xLmlwY01haW4uaGFuZGxlKENvbnN0YW50c18xLklQQ0tleS5TaG93T3BlbkRpYWxvZywgb25TaG93T3BlbkRpYWxvZyk7XG4gICAgZWxlY3Ryb25fMS5pcGNNYWluLmhhbmRsZShDb25zdGFudHNfMS5JUENLZXkuU2hvd1NhdmVEaWFsb2csIG9uU2hvd1NhdmVEaWFsb2cpO1xuICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5oYW5kbGUoQ29uc3RhbnRzXzEuSVBDS2V5LlNob3dNZXNzYWdlQm94LCBvblNob3dNZXNzYWdlQm94KTtcbiAgICBlbGVjdHJvbl8xLmlwY01haW4uaGFuZGxlKENvbnN0YW50c18xLklQQ0tleS5TaG93VVJMLCBvblNob3dVUkwpO1xufTtcbi8qKlxuICogUmVsZWFzZSBJUEMgZXZlbnRzLlxuICovXG5leHBvcnRzLnJlbGVhc2VJcGNFdmVudHMgPSAoKSA9PiB7XG4gICAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoQ29uc3RhbnRzXzEuSVBDS2V5LlNob3dPcGVuRGlhbG9nKTtcbiAgICAgICAgZWxlY3Ryb25fMS5pcGNNYWluLnJlbW92ZUFsbExpc3RlbmVycyhDb25zdGFudHNfMS5JUENLZXkuU2hvd1NhdmVEaWFsb2cpO1xuICAgICAgICBlbGVjdHJvbl8xLmlwY01haW4ucmVtb3ZlQWxsTGlzdGVuZXJzKENvbnN0YW50c18xLklQQ0tleS5TaG93TWVzc2FnZUJveCk7XG4gICAgICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoQ29uc3RhbnRzXzEuSVBDS2V5LlNob3dVUkwpO1xuICAgIH1cbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZWxlY3Ryb25fMSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbi8qKlxuICogQ3JlYXRlIGEgdGVtcGxhdGUgZm9yIHRoZSBtZW51LlxuICogQHJldHVybnMgVGVtcGxhdGUuXG4gKi9cbmNvbnN0IGNyZWF0ZVRlbXBsYXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzTWFjID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2Rhcndpbic7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgLi4uKGlzTWFjXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBlbGVjdHJvbl8xLmFwcC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdhYm91dCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ3NlcnZpY2VzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnaGlkZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ2hpZGVvdGhlcnMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICd1bmhpZGUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdxdWl0JyB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgICA6IFtdKSxcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdFZGl0JyxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICd1bmRvJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3JlZG8nIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ2N1dCcgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdjb3B5JyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3Bhc3RlJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3Bhc3RlYW5kbWF0Y2hzdHlsZScgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdkZWxldGUnIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnc2VsZWN0YWxsJyB9LFxuICAgICAgICAgICAgICAgIC4uLihpc01hY1xuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1NwZWVjaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWVudTogW3sgcm9sZTogJ3N0YXJ0c3BlYWtpbmcnIH0sIHsgcm9sZTogJ3N0b3BzcGVha2luZycgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICA6IFtdKVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ1ZpZXcnLFxuICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3JlbG9hZCcgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdmb3JjZXJlbG9hZCcgfSxcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgICAgICAgICB7IHJvbGU6ICd0b2dnbGVkZXZ0b29scycgfSxcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncmVzZXR6b29tJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3pvb21pbicgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICd6b29tb3V0JyB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICd0b2dnbGVmdWxsc2NyZWVuJyB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJvbGU6ICd3aW5kb3cnLFxuICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICAgIC4uLihpc01hY1xuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ2Nsb3NlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnbWluaW1pemUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICd6b29tJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnZnJvbnQnIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICA6IFt7IHJvbGU6ICdtaW5pbWl6ZScgfSwgeyByb2xlOiAnY2xvc2UnIH1dKVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByb2xlOiAnaGVscCcsXG4gICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0xlYXJuIE1vcmUnLFxuICAgICAgICAgICAgICAgICAgICBjbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoJ2VsZWN0cm9uJykuc2hlbGwub3BlbkV4dGVybmFsKCdodHRwczovL2VsZWN0cm9uanMub3JnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdO1xufTtcbi8qKlxuICogQ3JlYXRlIGFuZCBzZXQgbWFpbiBtZW51LlxuICovXG5leHBvcnRzLmNyZWF0ZU1haW5NZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gZWxlY3Ryb25fMS5NZW51LmJ1aWxkRnJvbVRlbXBsYXRlKGNyZWF0ZVRlbXBsYXRlKCkpO1xuICAgIGVsZWN0cm9uXzEuTWVudS5zZXRBcHBsaWNhdGlvbk1lbnUodGVtcGxhdGUpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuY3JlYXRlTWFpbk1lbnU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGVsZWN0cm9uXzEgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XG5sZXQgbWFpbldpbmRvdztcbi8qKlxuICogQ3JlYXRlIGEgbWFpbiB3aW5kb3cgb2YgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydHMuY3JlYXRlTWFpbldpbmRvdyA9ICgpID0+IHtcbiAgICBpZiAobWFpbldpbmRvdykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHdpbmRvdyA9IG5ldyBlbGVjdHJvbl8xLkJyb3dzZXJXaW5kb3coe1xuICAgICAgICB3aWR0aDogOTQwLFxuICAgICAgICBoZWlnaHQ6IDcwMCxcbiAgICAgICAgbWluV2lkdGg6IDQ4MCxcbiAgICAgICAgbWluSGVpZ2h0OiAzMjAsXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgICAgICAgIG5vZGVJbnRlZ3JhdGlvbjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICB3aW5kb3cub24oXCJjbG9zZWRcIiwgKCkgPT4ge1xuICAgICAgICBtYWluV2luZG93ID0gbnVsbDtcbiAgICB9KTtcbiAgICB3aW5kb3cubG9hZEZpbGUoXCJhc3NldHMvaW5kZXguaHRtbFwiKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9