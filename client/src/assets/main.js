/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__,
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (
    value,
    mode,
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key),
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = "./src/main/AppMain.ts"),
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./src/main/AppMain.ts":
      /*!*****************************!*\
  !*** ./src/main/AppMain.ts ***!
  \*****************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        const electron_1 = __webpack_require__(/*! electron */ "electron");
        const IPCEvents_1 = __webpack_require__(
          /*! ./IPCEvents */ "./src/main/IPCEvents.ts",
        );
        const WindowManager_1 = __webpack_require__(
          /*! ./WindowManager */ "./src/main/WindowManager.ts",
        );
        const MainMenu_1 = __webpack_require__(
          /*! ./MainMenu */ "./src/main/MainMenu.ts",
        );
        electron_1.app.name = "Starter";
        electron_1.app.on("ready", () => {
          ////////////////////////
          console.log("Initialize Application");
          ////////////
          WindowManager_1.createMainWindow();
          MainMenu_1.createMainMenu();
          IPCEvents_1.initializeIpcEvents();
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
          IPCEvents_1.releaseIpcEvents();
          electron_1.app.quit();
        });

        /***/
      },

    /***/ "./src/main/IPCEvents.ts":
      /*!*******************************!*\
  !*** ./src/main/IPCEvents.ts ***!
  \*******************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        const electron_1 = __webpack_require__(/*! electron */ "electron");
        /**
         * Occurs when show of a file open dialog is requested.
         * @param ev Event data.
         * @param options Options of `dialog.showOpenDialog`.
         */
        const onShowOpenDialog = async (ev, options) => {
          const win = electron_1.BrowserWindow.fromWebContents(ev.sender);
          if (win) {
            return electron_1.dialog.showOpenDialog(win, options);
          } else {
            throw new Error("Message sender window does not exist");
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
          } else {
            throw new Error("Message sender window does not exist");
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
          } else {
            throw new Error("Message sender window does not exist");
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
        };
        /**
         * Release IPC events.
         */
        exports.releaseIpcEvents = () => {
          if (initialized) {
          }
          initialized = false;
        };

        /***/
      },

    /***/ "./src/main/MainMenu.ts":
      /*!******************************!*\
  !*** ./src/main/MainMenu.ts ***!
  \******************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        const electron_1 = __webpack_require__(/*! electron */ "electron");
        /**
         * Create a template for the menu.
         * @returns Template.
         */
        const createTemplate = () => {
          const isMac = process.platform === "darwin";
          return [
            ...(isMac
              ? [
                  {
                    label: electron_1.app.name,
                    submenu: [
                      { role: "about" },
                      { type: "separator" },
                      { role: "services" },
                      { type: "separator" },
                      { role: "hide" },
                      { role: "hideothers" },
                      { role: "unhide" },
                      { type: "separator" },
                      { role: "quit" },
                    ],
                  },
                ]
              : []),
            {
              label: "Edit",
              submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                { role: "pasteandmatchstyle" },
                { role: "delete" },
                { role: "selectall" },
                ...(isMac
                  ? [
                      { type: "separator" },
                      {
                        label: "Speech",
                        submenu: [
                          { role: "startspeaking" },
                          { role: "stopspeaking" },
                        ],
                      },
                    ]
                  : []),
              ],
            },
            {
              label: "View",
              submenu: [
                { role: "reload" },
                { role: "forcereload" },
                //////////////////////////////
                { role: "toggledevtools" },
                //////////////////
                { type: "separator" },
                { role: "resetzoom" },
                { role: "zoomin" },
                { role: "zoomout" },
                { type: "separator" },
                { role: "togglefullscreen" },
              ],
            },
            {
              role: "window",
              submenu: [
                ...(isMac
                  ? [
                      { role: "close" },
                      { role: "minimize" },
                      { role: "zoom" },
                      { type: "separator" },
                      { role: "front" },
                    ]
                  : [{ role: "minimize" }, { role: "close" }]),
              ],
            },
            {
              role: "help",
              submenu: [
                {
                  label: "Learn More",
                  click() {
                    __webpack_require__(
                      /*! electron */ "electron",
                    ).shell.openExternal("https://electronjs.org");
                  },
                },
              ],
            },
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

        /***/
      },

    /***/ "./src/main/WindowManager.ts":
      /*!***********************************!*\
  !*** ./src/main/WindowManager.ts ***!
  \***********************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
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

        /***/
      },

    /***/ electron:
      /*!***************************!*\
  !*** external "electron" ***!
  \***************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        module.exports = require("electron");

        /***/
      },

    /******/
  },
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vQXBwTWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9JUENFdmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vTWFpbk1lbnUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vV2luZG93TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBbUIsbUJBQU8sQ0FBQywwQkFBVTtBQUNyQyxvQkFBb0IsbUJBQU8sQ0FBQyw0Q0FBYTtBQUN6Qyx3QkFBd0IsbUJBQU8sQ0FBQyxvREFBaUI7QUFDakQsbUJBQW1CLG1CQUFPLENBQUMsMENBQVk7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBLHFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluL0FwcE1haW4udHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGVsZWN0cm9uXzEgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XG5jb25zdCBJUENFdmVudHNfMSA9IHJlcXVpcmUoXCIuL0lQQ0V2ZW50c1wiKTtcbmNvbnN0IFdpbmRvd01hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL1dpbmRvd01hbmFnZXJcIik7XG5jb25zdCBNYWluTWVudV8xID0gcmVxdWlyZShcIi4vTWFpbk1lbnVcIik7XG5lbGVjdHJvbl8xLmFwcC5uYW1lID0gJ1N0YXJ0ZXInO1xuZWxlY3Ryb25fMS5hcHAub24oJ3JlYWR5JywgKCkgPT4ge1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXplIEFwcGxpY2F0aW9uJyk7XG4gICAgLy8vLy8vLy8vLy8vXG4gICAgV2luZG93TWFuYWdlcl8xLmNyZWF0ZU1haW5XaW5kb3coKTtcbiAgICBNYWluTWVudV8xLmNyZWF0ZU1haW5NZW51KCk7XG4gICAgSVBDRXZlbnRzXzEuaW5pdGlhbGl6ZUlwY0V2ZW50cygpO1xufSk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5lbGVjdHJvbl8xLmFwcC5vbigncXVpdCcsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQXBwbGljYXRpb24gaXMgcXVpdCcpO1xufSk7XG4vLy8vLy8vLy8vXG5lbGVjdHJvbl8xLmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCAoKSA9PiB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc29sZS5sb2coJ0FsbCBvZiB0aGUgd2luZG93IHdhcyBjbG9zZWQuJyk7XG4gICAgLy8vLy8vLy8vLy8vXG4gICAgSVBDRXZlbnRzXzEucmVsZWFzZUlwY0V2ZW50cygpO1xuICAgIGVsZWN0cm9uXzEuYXBwLnF1aXQoKTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBlbGVjdHJvbl8xID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xuY29uc3QgQ29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL0NvbnN0YW50c1wiKTtcbi8qKlxuICogT2NjdXJzIHdoZW4gc2hvdyBvZiBhIGZpbGUgb3BlbiBkaWFsb2cgaXMgcmVxdWVzdGVkLlxuICogQHBhcmFtIGV2IEV2ZW50IGRhdGEuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIG9mIGBkaWFsb2cuc2hvd09wZW5EaWFsb2dgLlxuICovXG5jb25zdCBvblNob3dPcGVuRGlhbG9nID0gYXN5bmMgKGV2LCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3Qgd2luID0gZWxlY3Ryb25fMS5Ccm93c2VyV2luZG93LmZyb21XZWJDb250ZW50cyhldi5zZW5kZXIpO1xuICAgIGlmICh3aW4pIHtcbiAgICAgICAgcmV0dXJuIGVsZWN0cm9uXzEuZGlhbG9nLnNob3dPcGVuRGlhbG9nKHdpbiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2Ugc2VuZGVyIHdpbmRvdyBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cbn07XG4vKipcbiAqIE9jY3VycyB3aGVuIHNob3cgb2YgYSBzYXZlIGRpYWxvZyBpcyByZXF1ZXN0ZWQuXG4gKiBAcGFyYW0gZXYgRXZlbnQgZGF0YS5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgb2YgYGRpYWxvZy5zaG93U2F2ZURpYWxvZ2AuXG4gKi9cbmNvbnN0IG9uU2hvd1NhdmVEaWFsb2cgPSBhc3luYyAoZXYsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCB3aW4gPSBlbGVjdHJvbl8xLkJyb3dzZXJXaW5kb3cuZnJvbVdlYkNvbnRlbnRzKGV2LnNlbmRlcik7XG4gICAgaWYgKHdpbikge1xuICAgICAgICByZXR1cm4gZWxlY3Ryb25fMS5kaWFsb2cuc2hvd1NhdmVEaWFsb2cod2luLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWVzc2FnZSBzZW5kZXIgd2luZG93IGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxufTtcbi8qKlxuICogT2NjdXJzIHdoZW4gc2hvdyBvZiBhIG1lc3NhZ2UgYm94IGlzIHJlcXVlc3RlZC5cbiAqIEBwYXJhbSBldiBFdmVudCBkYXRhLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBvZiBgZGlhbG9nLnNob3dNZXNzYWdlQm94YC5cbiAqL1xuY29uc3Qgb25TaG93TWVzc2FnZUJveCA9IGFzeW5jIChldiwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHdpbiA9IGVsZWN0cm9uXzEuQnJvd3NlcldpbmRvdy5mcm9tV2ViQ29udGVudHMoZXYuc2VuZGVyKTtcbiAgICBpZiAod2luKSB7XG4gICAgICAgIHJldHVybiBlbGVjdHJvbl8xLmRpYWxvZy5zaG93TWVzc2FnZUJveCh3aW4sIG9wdGlvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXNzYWdlIHNlbmRlciB3aW5kb3cgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG59O1xuLyoqXG4gKiBPY2N1cnMgaW4gYSByZXF1ZXN0IHRvIG9wZW4gVVJMIGluIGEgc2hlbGxcbiAqIEBwYXJhbSBldiBFdmVudCBkYXRhLlxuICogQHBhcmFtIGl0ZW1QYXRoIFBhdGggb2YgdGhlIHRhcmdldCBmb2xkZXIuXG4gKi9cbmNvbnN0IG9uU2hvd1VSTCA9IGFzeW5jIChldiwgdXJsKSA9PiB7XG4gICAgcmV0dXJuIGVsZWN0cm9uXzEuc2hlbGwub3BlbkV4dGVybmFsKHVybCk7XG59O1xuLyoqIEEgdmFsdWUgaW5kaWNhdGluZyB0aGF0IGFuIElQQyBldmVudHMgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuICovXG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbi8qKlxuICogSW5pdGlhbGl6ZSBJUEMgZXZlbnRzLlxuICovXG5leHBvcnRzLmluaXRpYWxpemVJcGNFdmVudHMgPSAoKSA9PiB7XG4gICAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5oYW5kbGUoQ29uc3RhbnRzXzEuSVBDS2V5LlNob3dPcGVuRGlhbG9nLCBvblNob3dPcGVuRGlhbG9nKTtcbiAgICBlbGVjdHJvbl8xLmlwY01haW4uaGFuZGxlKENvbnN0YW50c18xLklQQ0tleS5TaG93U2F2ZURpYWxvZywgb25TaG93U2F2ZURpYWxvZyk7XG4gICAgZWxlY3Ryb25fMS5pcGNNYWluLmhhbmRsZShDb25zdGFudHNfMS5JUENLZXkuU2hvd01lc3NhZ2VCb3gsIG9uU2hvd01lc3NhZ2VCb3gpO1xuICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5oYW5kbGUoQ29uc3RhbnRzXzEuSVBDS2V5LlNob3dVUkwsIG9uU2hvd1VSTCk7XG59O1xuLyoqXG4gKiBSZWxlYXNlIElQQyBldmVudHMuXG4gKi9cbmV4cG9ydHMucmVsZWFzZUlwY0V2ZW50cyA9ICgpID0+IHtcbiAgICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgZWxlY3Ryb25fMS5pcGNNYWluLnJlbW92ZUFsbExpc3RlbmVycyhDb25zdGFudHNfMS5JUENLZXkuU2hvd09wZW5EaWFsb2cpO1xuICAgICAgICBlbGVjdHJvbl8xLmlwY01haW4ucmVtb3ZlQWxsTGlzdGVuZXJzKENvbnN0YW50c18xLklQQ0tleS5TaG93U2F2ZURpYWxvZyk7XG4gICAgICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoQ29uc3RhbnRzXzEuSVBDS2V5LlNob3dNZXNzYWdlQm94KTtcbiAgICAgICAgZWxlY3Ryb25fMS5pcGNNYWluLnJlbW92ZUFsbExpc3RlbmVycyhDb25zdGFudHNfMS5JUENLZXkuU2hvd1VSTCk7XG4gICAgfVxuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBlbGVjdHJvbl8xID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xuLyoqXG4gKiBDcmVhdGUgYSB0ZW1wbGF0ZSBmb3IgdGhlIG1lbnUuXG4gKiBAcmV0dXJucyBUZW1wbGF0ZS5cbiAqL1xuY29uc3QgY3JlYXRlVGVtcGxhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgaXNNYWMgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJztcbiAgICByZXR1cm4gW1xuICAgICAgICAuLi4oaXNNYWNcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGVsZWN0cm9uXzEuYXBwLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ2Fib3V0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnc2VydmljZXMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdoaWRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnaGlkZW90aGVycycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ3VuaGlkZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ3F1aXQnIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW10pLFxuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQnLFxuICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3VuZG8nIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncmVkbycgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnY3V0JyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ2NvcHknIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncGFzdGUnIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncGFzdGVhbmRtYXRjaHN0eWxlJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ2RlbGV0ZScgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdzZWxlY3RhbGwnIH0sXG4gICAgICAgICAgICAgICAgLi4uKGlzTWFjXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3BlZWNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJtZW51OiBbeyByb2xlOiAnc3RhcnRzcGVha2luZycgfSwgeyByb2xlOiAnc3RvcHNwZWFraW5nJyB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogW10pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnVmlldycsXG4gICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgICAgeyByb2xlOiAncmVsb2FkJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ2ZvcmNlcmVsb2FkJyB9LFxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3RvZ2dsZWRldnRvb2xzJyB9LFxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICdyZXNldHpvb20nIH0sXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnem9vbWluJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3pvb21vdXQnIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICAgIHsgcm9sZTogJ3RvZ2dsZWZ1bGxzY3JlZW4nIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcm9sZTogJ3dpbmRvdycsXG4gICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgICAgLi4uKGlzTWFjXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyByb2xlOiAnY2xvc2UnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdtaW5pbWl6ZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogJ3pvb20nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6ICdmcm9udCcgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogW3sgcm9sZTogJ21pbmltaXplJyB9LCB7IHJvbGU6ICdjbG9zZScgfV0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJvbGU6ICdoZWxwJyxcbiAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTGVhcm4gTW9yZScsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZSgnZWxlY3Ryb24nKS5zaGVsbC5vcGVuRXh0ZXJuYWwoJ2h0dHBzOi8vZWxlY3Ryb25qcy5vcmcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF07XG59O1xuLyoqXG4gKiBDcmVhdGUgYW5kIHNldCBtYWluIG1lbnUuXG4gKi9cbmV4cG9ydHMuY3JlYXRlTWFpbk1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBlbGVjdHJvbl8xLk1lbnUuYnVpbGRGcm9tVGVtcGxhdGUoY3JlYXRlVGVtcGxhdGUoKSk7XG4gICAgZWxlY3Ryb25fMS5NZW51LnNldEFwcGxpY2F0aW9uTWVudSh0ZW1wbGF0ZSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5jcmVhdGVNYWluTWVudTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZWxlY3Ryb25fMSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbmxldCBtYWluV2luZG93O1xuLyoqXG4gKiBDcmVhdGUgYSBtYWluIHdpbmRvdyBvZiBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0cy5jcmVhdGVNYWluV2luZG93ID0gKCkgPT4ge1xuICAgIGlmIChtYWluV2luZG93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgd2luZG93ID0gbmV3IGVsZWN0cm9uXzEuQnJvd3NlcldpbmRvdyh7XG4gICAgICAgIHdpZHRoOiA5NDAsXG4gICAgICAgIGhlaWdodDogNzAwLFxuICAgICAgICBtaW5XaWR0aDogNDgwLFxuICAgICAgICBtaW5IZWlnaHQ6IDMyMCxcbiAgICAgICAgcmVzaXphYmxlOiB0cnVlLFxuICAgICAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHdpbmRvdy5vbihcImNsb3NlZFwiLCAoKSA9PiB7XG4gICAgICAgIG1haW5XaW5kb3cgPSBudWxsO1xuICAgIH0pO1xuICAgIHdpbmRvdy5sb2FkRmlsZShcImFzc2V0cy9pbmRleC5odG1sXCIpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=
