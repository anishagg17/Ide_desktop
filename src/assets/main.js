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

/***/ "./src/main/AppMain.ts":
/*!*****************************!*\
  !*** ./src/main/AppMain.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __webpack_require__(/*! electron */ "electron");
const WindowManager_1 = __webpack_require__(/*! ./WindowManager */ "./src/main/WindowManager.ts");
const MainMenu_1 = __webpack_require__(/*! ./MainMenu */ "./src/main/MainMenu.ts");
electron_1.app.name = "Starter";
electron_1.app.on("ready", () => {
    ////////////////////////
    console.log("Initialize Application");
    ////////////
    WindowManager_1.createMainWindow();
    MainMenu_1.createMainMenu();
});
//////////////////////
electron_1.app.on("quit", () => {
    console.log("Application is quit");
});
//////////
electron_1.app.on("window-all-closed", () => {
    ////////////////////////
    console.log("All of the window was closed.");
    ////////////
    electron_1.app.quit();
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vQXBwTWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9NYWluTWVudS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9XaW5kb3dNYW5hZ2VyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImVsZWN0cm9uXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLDBCQUFVO0FBQ3JDLHdCQUF3QixtQkFBTyxDQUFDLG9EQUFpQjtBQUNqRCxtQkFBbUIsbUJBQU8sQ0FBQywwQ0FBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3ZCWTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLDBCQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekMseUJBQXlCLG9CQUFvQjtBQUM3Qyx5QkFBeUIsbUJBQW1CO0FBQzVDLHlCQUF5QixvQkFBb0I7QUFDN0MseUJBQXlCLGVBQWU7QUFDeEMseUJBQXlCLHFCQUFxQjtBQUM5Qyx5QkFBeUIsaUJBQWlCO0FBQzFDLHlCQUF5QixvQkFBb0I7QUFDN0MseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEMsaUJBQWlCLGVBQWU7QUFDaEMsaUJBQWlCLG9CQUFvQjtBQUNyQyxpQkFBaUIsY0FBYztBQUMvQixpQkFBaUIsZUFBZTtBQUNoQyxpQkFBaUIsZ0JBQWdCO0FBQ2pDLGlCQUFpQiw2QkFBNkI7QUFDOUMsaUJBQWlCLGlCQUFpQjtBQUNsQyxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQSx5QkFBeUIsb0JBQW9CO0FBQzdDO0FBQ0E7QUFDQSx1Q0FBdUMsd0JBQXdCLEdBQUcsdUJBQXVCO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEMsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBLGlCQUFpQix5QkFBeUI7QUFDMUM7QUFDQSxpQkFBaUIsb0JBQW9CO0FBQ3JDLGlCQUFpQixvQkFBb0I7QUFDckMsaUJBQWlCLGlCQUFpQjtBQUNsQyxpQkFBaUIsa0JBQWtCO0FBQ25DLGlCQUFpQixvQkFBb0I7QUFDckMsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0JBQWdCO0FBQ3pDLHlCQUF5QixtQkFBbUI7QUFDNUMseUJBQXlCLGVBQWU7QUFDeEMseUJBQXlCLG9CQUFvQjtBQUM3Qyx5QkFBeUI7QUFDekI7QUFDQSx3QkFBd0IsbUJBQW1CLEdBQUcsZ0JBQWdCO0FBQzlEO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBTyxDQUFDLDBCQUFVO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyR2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBbUIsbUJBQU8sQ0FBQywwQkFBVTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkEscUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4vQXBwTWFpbi50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZWxlY3Ryb25fMSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbmNvbnN0IFdpbmRvd01hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL1dpbmRvd01hbmFnZXJcIik7XG5jb25zdCBNYWluTWVudV8xID0gcmVxdWlyZShcIi4vTWFpbk1lbnVcIik7XG5lbGVjdHJvbl8xLmFwcC5uYW1lID0gXCJTdGFydGVyXCI7XG5lbGVjdHJvbl8xLmFwcC5vbihcInJlYWR5XCIsICgpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zb2xlLmxvZyhcIkluaXRpYWxpemUgQXBwbGljYXRpb25cIik7XG4gICAgLy8vLy8vLy8vLy8vXG4gICAgV2luZG93TWFuYWdlcl8xLmNyZWF0ZU1haW5XaW5kb3coKTtcbiAgICBNYWluTWVudV8xLmNyZWF0ZU1haW5NZW51KCk7XG59KTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmVsZWN0cm9uXzEuYXBwLm9uKFwicXVpdFwiLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJBcHBsaWNhdGlvbiBpcyBxdWl0XCIpO1xufSk7XG4vLy8vLy8vLy8vXG5lbGVjdHJvbl8xLmFwcC5vbihcIndpbmRvdy1hbGwtY2xvc2VkXCIsICgpID0+IHtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zb2xlLmxvZyhcIkFsbCBvZiB0aGUgd2luZG93IHdhcyBjbG9zZWQuXCIpO1xuICAgIC8vLy8vLy8vLy8vL1xuICAgIGVsZWN0cm9uXzEuYXBwLnF1aXQoKTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBlbGVjdHJvbl8xID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xuLyoqXG4gKiBDcmVhdGUgYSB0ZW1wbGF0ZSBmb3IgdGhlIG1lbnUuXG4gKiBAcmV0dXJucyBUZW1wbGF0ZS5cbiAqL1xuY29uc3QgY3JlYXRlVGVtcGxhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgaXNNYWMgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJztcbiAgICByZXR1cm4gW1xuICAgICAgICAuLi4oaXNNYWNcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGVsZWN0cm9uXzEuYXBwLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ2Fib3V0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnc2VydmljZXMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdoaWRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnaGlkZW90aGVycycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ3VuaGlkZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ3F1aXQnIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW10pLFxuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQnLFxuICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3VuZG8nIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncmVkbycgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnY3V0JyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ2NvcHknIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncGFzdGUnIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncGFzdGVhbmRtYXRjaHN0eWxlJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ2RlbGV0ZScgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdzZWxlY3RhbGwnIH0sXG4gICAgICAgICAgICAgICAgLi4uKGlzTWFjXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3BlZWNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJtZW51OiBbeyByb2xlOiAnc3RhcnRzcGVha2luZycgfSwgeyByb2xlOiAnc3RvcHNwZWFraW5nJyB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogW10pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnVmlldycsXG4gICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncmVsb2FkJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ2ZvcmNlcmVsb2FkJyB9LFxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3RvZ2dsZWRldnRvb2xzJyB9LFxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdyZXNldHpvb20nIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnem9vbWluJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3pvb21vdXQnIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3RvZ2dsZWZ1bGxzY3JlZW4nIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcm9sZTogJ3dpbmRvdycsXG4gICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgICAgLi4uKGlzTWFjXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnY2xvc2UnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdtaW5pbWl6ZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ3pvb20nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdmcm9udCcgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogW3sgcm9sZTogJ21pbmltaXplJyB9LCB7IHJvbGU6ICdjbG9zZScgfV0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJvbGU6ICdoZWxwJyxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTGVhcm4gTW9yZScsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZSgnZWxlY3Ryb24nKS5zaGVsbC5vcGVuRXh0ZXJuYWwoJ2h0dHBzOi8vZWxlY3Ryb25qcy5vcmcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF07XG59O1xuLyoqXG4gKiBDcmVhdGUgYW5kIHNldCBtYWluIG1lbnUuXG4gKi9cbmV4cG9ydHMuY3JlYXRlTWFpbk1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBlbGVjdHJvbl8xLk1lbnUuYnVpbGRGcm9tVGVtcGxhdGUoY3JlYXRlVGVtcGxhdGUoKSk7XG4gICAgZWxlY3Ryb25fMS5NZW51LnNldEFwcGxpY2F0aW9uTWVudSh0ZW1wbGF0ZSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5jcmVhdGVNYWluTWVudTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZWxlY3Ryb25fMSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbmxldCBtYWluV2luZG93O1xuLyoqXG4gKiBDcmVhdGUgYSBtYWluIHdpbmRvdyBvZiBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0cy5jcmVhdGVNYWluV2luZG93ID0gKCkgPT4ge1xuICAgIGlmIChtYWluV2luZG93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgd2luZG93ID0gbmV3IGVsZWN0cm9uXzEuQnJvd3NlcldpbmRvdyh7XG4gICAgICAgIHdpZHRoOiA5NDAsXG4gICAgICAgIGhlaWdodDogNzAwLFxuICAgICAgICBtaW5XaWR0aDogNDgwLFxuICAgICAgICBtaW5IZWlnaHQ6IDMyMCxcbiAgICAgICAgcmVzaXphYmxlOiB0cnVlLFxuICAgICAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHdpbmRvdy5vbihcImNsb3NlZFwiLCAoKSA9PiB7XG4gICAgICAgIG1haW5XaW5kb3cgPSBudWxsO1xuICAgIH0pO1xuICAgIHdpbmRvdy5sb2FkRmlsZShcImFzc2V0cy9pbmRleC5odG1sXCIpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=