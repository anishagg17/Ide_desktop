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
        width: 800,
        height: 600,
        minWidth: 480,
        minHeight: 320,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.on('closed', () => {
        mainWindow = null;
    });
    window.loadFile('assets/index.html');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vQXBwTWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9JUENFdmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vTWFpbk1lbnUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vV2luZG93TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGlEQUFpRDs7Ozs7Ozs7Ozs7OztBQ1hyQztBQUNi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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyR2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBbUIsbUJBQU8sQ0FBQywwQkFBVTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBLHFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluL0FwcE1haW4udHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIGtleSBuYW1lIHRoYXQgaXMgdGhlIGNoYW5uZWwgb2YgdGhlIElQQyBtZXNzYWdlLi5cbiAqL1xudmFyIElQQ0tleTtcbihmdW5jdGlvbiAoSVBDS2V5KSB7XG4gICAgSVBDS2V5W1wiU2hvd09wZW5EaWFsb2dcIl0gPSBcIlNob3dPcGVuRGlhbG9nXCI7XG4gICAgSVBDS2V5W1wiU2hvd1NhdmVEaWFsb2dcIl0gPSBcIlNob3dTYXZlRGlhbG9nXCI7XG4gICAgSVBDS2V5W1wiU2hvd01lc3NhZ2VCb3hcIl0gPSBcIlNob3dNZXNzYWdlQm94XCI7XG4gICAgSVBDS2V5W1wiU2hvd1VSTFwiXSA9IFwiU2hvd1VSTFwiO1xufSkoSVBDS2V5ID0gZXhwb3J0cy5JUENLZXkgfHwgKGV4cG9ydHMuSVBDS2V5ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZWxlY3Ryb25fMSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbmNvbnN0IElQQ0V2ZW50c18xID0gcmVxdWlyZShcIi4vSVBDRXZlbnRzXCIpO1xuY29uc3QgV2luZG93TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vV2luZG93TWFuYWdlclwiKTtcbmNvbnN0IE1haW5NZW51XzEgPSByZXF1aXJlKFwiLi9NYWluTWVudVwiKTtcbmVsZWN0cm9uXzEuYXBwLm5hbWUgPSAnU3RhcnRlcic7XG5lbGVjdHJvbl8xLmFwcC5vbigncmVhZHknLCAoKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc29sZS5sb2coJ0luaXRpYWxpemUgQXBwbGljYXRpb24nKTtcbiAgICAvLy8vLy8vLy8vLy9cbiAgICBXaW5kb3dNYW5hZ2VyXzEuY3JlYXRlTWFpbldpbmRvdygpO1xuICAgIE1haW5NZW51XzEuY3JlYXRlTWFpbk1lbnUoKTtcbiAgICBJUENFdmVudHNfMS5pbml0aWFsaXplSXBjRXZlbnRzKCk7XG59KTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmVsZWN0cm9uXzEuYXBwLm9uKCdxdWl0JywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdBcHBsaWNhdGlvbiBpcyBxdWl0Jyk7XG59KTtcbi8vLy8vLy8vLy9cbmVsZWN0cm9uXzEuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsICgpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zb2xlLmxvZygnQWxsIG9mIHRoZSB3aW5kb3cgd2FzIGNsb3NlZC4nKTtcbiAgICAvLy8vLy8vLy8vLy9cbiAgICBJUENFdmVudHNfMS5yZWxlYXNlSXBjRXZlbnRzKCk7XG4gICAgZWxlY3Ryb25fMS5hcHAucXVpdCgpO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGVsZWN0cm9uXzEgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XG5jb25zdCBDb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vQ29uc3RhbnRzXCIpO1xuLyoqXG4gKiBPY2N1cnMgd2hlbiBzaG93IG9mIGEgZmlsZSBvcGVuIGRpYWxvZyBpcyByZXF1ZXN0ZWQuXG4gKiBAcGFyYW0gZXYgRXZlbnQgZGF0YS5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgb2YgYGRpYWxvZy5zaG93T3BlbkRpYWxvZ2AuXG4gKi9cbmNvbnN0IG9uU2hvd09wZW5EaWFsb2cgPSBhc3luYyAoZXYsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCB3aW4gPSBlbGVjdHJvbl8xLkJyb3dzZXJXaW5kb3cuZnJvbVdlYkNvbnRlbnRzKGV2LnNlbmRlcik7XG4gICAgaWYgKHdpbikge1xuICAgICAgICByZXR1cm4gZWxlY3Ryb25fMS5kaWFsb2cuc2hvd09wZW5EaWFsb2cod2luLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWVzc2FnZSBzZW5kZXIgd2luZG93IGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufTtcbi8qKlxuICogT2NjdXJzIHdoZW4gc2hvdyBvZiBhIHNhdmUgZGlhbG9nIGlzIHJlcXVlc3RlZC5cbiAqIEBwYXJhbSBldiBFdmVudCBkYXRhLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBvZiBgZGlhbG9nLnNob3dTYXZlRGlhbG9nYC5cbiAqL1xuY29uc3Qgb25TaG93U2F2ZURpYWxvZyA9IGFzeW5jIChldiwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHdpbiA9IGVsZWN0cm9uXzEuQnJvd3NlcldpbmRvdy5mcm9tV2ViQ29udGVudHMoZXYuc2VuZGVyKTtcbiAgICBpZiAod2luKSB7XG4gICAgICAgIHJldHVybiBlbGVjdHJvbl8xLmRpYWxvZy5zaG93U2F2ZURpYWxvZyh3aW4sIG9wdGlvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXNzYWdlIHNlbmRlciB3aW5kb3cgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG59O1xuLyoqXG4gKiBPY2N1cnMgd2hlbiBzaG93IG9mIGEgbWVzc2FnZSBib3ggaXMgcmVxdWVzdGVkLlxuICogQHBhcmFtIGV2IEV2ZW50IGRhdGEuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIG9mIGBkaWFsb2cuc2hvd01lc3NhZ2VCb3hgLlxuICovXG5jb25zdCBvblNob3dNZXNzYWdlQm94ID0gYXN5bmMgKGV2LCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3Qgd2luID0gZWxlY3Ryb25fMS5Ccm93c2VyV2luZG93LmZyb21XZWJDb250ZW50cyhldi5zZW5kZXIpO1xuICAgIGlmICh3aW4pIHtcbiAgICAgICAgcmV0dXJuIGVsZWN0cm9uXzEuZGlhbG9nLnNob3dNZXNzYWdlQm94KHdpbiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2Ugc2VuZGVyIHdpbmRvdyBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cbn07XG4vKipcbiAqIE9jY3VycyBpbiBhIHJlcXVlc3QgdG8gb3BlbiBVUkwgaW4gYSBzaGVsbFxuICogQHBhcmFtIGV2IEV2ZW50IGRhdGEuXG4gKiBAcGFyYW0gaXRlbVBhdGggUGF0aCBvZiB0aGUgdGFyZ2V0IGZvbGRlci5cbiAqL1xuY29uc3Qgb25TaG93VVJMID0gYXN5bmMgKGV2LCB1cmwpID0+IHtcbiAgICByZXR1cm4gZWxlY3Ryb25fMS5zaGVsbC5vcGVuRXh0ZXJuYWwodXJsKTtcbn07XG4vKiogQSB2YWx1ZSBpbmRpY2F0aW5nIHRoYXQgYW4gSVBDIGV2ZW50cyBoYXMgYmVlbiBpbml0aWFsaXplZC4gKi9cbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xuLyoqXG4gKiBJbml0aWFsaXplIElQQyBldmVudHMuXG4gKi9cbmV4cG9ydHMuaW5pdGlhbGl6ZUlwY0V2ZW50cyA9ICgpID0+IHtcbiAgICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgZWxlY3Ryb25fMS5pcGNNYWluLmhhbmRsZShDb25zdGFudHNfMS5JUENLZXkuU2hvd09wZW5EaWFsb2csIG9uU2hvd09wZW5EaWFsb2cpO1xuICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5oYW5kbGUoQ29uc3RhbnRzXzEuSVBDS2V5LlNob3dTYXZlRGlhbG9nLCBvblNob3dTYXZlRGlhbG9nKTtcbiAgICBlbGVjdHJvbl8xLmlwY01haW4uaGFuZGxlKENvbnN0YW50c18xLklQQ0tleS5TaG93TWVzc2FnZUJveCwgb25TaG93TWVzc2FnZUJveCk7XG4gICAgZWxlY3Ryb25fMS5pcGNNYWluLmhhbmRsZShDb25zdGFudHNfMS5JUENLZXkuU2hvd1VSTCwgb25TaG93VVJMKTtcbn07XG4vKipcbiAqIFJlbGVhc2UgSVBDIGV2ZW50cy5cbiAqL1xuZXhwb3J0cy5yZWxlYXNlSXBjRXZlbnRzID0gKCkgPT4ge1xuICAgIGlmIChpbml0aWFsaXplZCkge1xuICAgICAgICBlbGVjdHJvbl8xLmlwY01haW4ucmVtb3ZlQWxsTGlzdGVuZXJzKENvbnN0YW50c18xLklQQ0tleS5TaG93T3BlbkRpYWxvZyk7XG4gICAgICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoQ29uc3RhbnRzXzEuSVBDS2V5LlNob3dTYXZlRGlhbG9nKTtcbiAgICAgICAgZWxlY3Ryb25fMS5pcGNNYWluLnJlbW92ZUFsbExpc3RlbmVycyhDb25zdGFudHNfMS5JUENLZXkuU2hvd01lc3NhZ2VCb3gpO1xuICAgICAgICBlbGVjdHJvbl8xLmlwY01haW4ucmVtb3ZlQWxsTGlzdGVuZXJzKENvbnN0YW50c18xLklQQ0tleS5TaG93VVJMKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGVsZWN0cm9uXzEgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XG4vKipcbiAqIENyZWF0ZSBhIHRlbXBsYXRlIGZvciB0aGUgbWVudS5cbiAqIEByZXR1cm5zIFRlbXBsYXRlLlxuICovXG5jb25zdCBjcmVhdGVUZW1wbGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBpc01hYyA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nO1xuICAgIHJldHVybiBbXG4gICAgICAgIC4uLihpc01hY1xuICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZWxlY3Ryb25fMS5hcHAubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnYWJvdXQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdzZXJ2aWNlcycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ2hpZGUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdoaWRlb3RoZXJzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAndW5oaWRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAncXVpdCcgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgOiBbXSksXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnRWRpdCcsXG4gICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgICAgeyByb2xlOiAndW5kbycgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdyZWRvJyB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdjdXQnIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnY29weScgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdwYXN0ZScgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdwYXN0ZWFuZG1hdGNoc3R5bGUnIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnZGVsZXRlJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3NlbGVjdGFsbCcgfSxcbiAgICAgICAgICAgICAgICAuLi4oaXNNYWNcbiAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcGVlY2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1lbnU6IFt7IHJvbGU6ICdzdGFydHNwZWFraW5nJyB9LCB7IHJvbGU6ICdzdG9wc3BlYWtpbmcnIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgOiBbXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdWaWV3JyxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdyZWxvYWQnIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnZm9yY2VyZWxvYWQnIH0sXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgICAgICAgICAgeyByb2xlOiAndG9nZ2xlZGV2dG9vbHMnIH0sXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3Jlc2V0em9vbScgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICd6b29taW4nIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnem9vbW91dCcgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAndG9nZ2xlZnVsbHNjcmVlbicgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByb2xlOiAnd2luZG93JyxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICAuLi4oaXNNYWNcbiAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdjbG9zZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ21pbmltaXplJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnem9vbScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ2Zyb250JyB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgOiBbeyByb2xlOiAnbWluaW1pemUnIH0sIHsgcm9sZTogJ2Nsb3NlJyB9XSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcm9sZTogJ2hlbHAnLFxuICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdMZWFybiBNb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2soKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlKCdlbGVjdHJvbicpLnNoZWxsLm9wZW5FeHRlcm5hbCgnaHR0cHM6Ly9lbGVjdHJvbmpzLm9yZycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgXTtcbn07XG4vKipcbiAqIENyZWF0ZSBhbmQgc2V0IG1haW4gbWVudS5cbiAqL1xuZXhwb3J0cy5jcmVhdGVNYWluTWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGVsZWN0cm9uXzEuTWVudS5idWlsZEZyb21UZW1wbGF0ZShjcmVhdGVUZW1wbGF0ZSgpKTtcbiAgICBlbGVjdHJvbl8xLk1lbnUuc2V0QXBwbGljYXRpb25NZW51KHRlbXBsYXRlKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmNyZWF0ZU1haW5NZW51O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBlbGVjdHJvbl8xID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xubGV0IG1haW5XaW5kb3c7XG4vKipcbiAqIENyZWF0ZSBhIG1haW4gd2luZG93IG9mIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnRzLmNyZWF0ZU1haW5XaW5kb3cgPSAoKSA9PiB7XG4gICAgaWYgKG1haW5XaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB3aW5kb3cgPSBuZXcgZWxlY3Ryb25fMS5Ccm93c2VyV2luZG93KHtcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgIG1pbldpZHRoOiA0ODAsXG4gICAgICAgIG1pbkhlaWdodDogMzIwLFxuICAgICAgICByZXNpemFibGU6IHRydWUsXG4gICAgICAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgICAgICAgICBub2RlSW50ZWdyYXRpb246IHRydWVcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHdpbmRvdy5vbignY2xvc2VkJywgKCkgPT4ge1xuICAgICAgICBtYWluV2luZG93ID0gbnVsbDtcbiAgICB9KTtcbiAgICB3aW5kb3cubG9hZEZpbGUoJ2Fzc2V0cy9pbmRleC5odG1sJyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==