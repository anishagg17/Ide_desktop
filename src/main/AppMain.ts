import { app } from "electron";
import { createMainWindow } from "./WindowManager";
import { createMainMenu } from "./MainMenu";

app.name = "Starter";

app.on("ready", () => {
  /// #if env == 'DEBUG'
  console.log("Initialize Application");
  /// #endif

  createMainWindow();
  createMainMenu();
});

/// #if env == 'DEBUG'
app.on("quit", () => {
  console.log("Application is quit");
});
/// #endif

app.on("window-all-closed", () => {
  /// #if env == 'DEBUG'
  console.log("All of the window was closed.");
  /// #endif

  app.quit();
});
