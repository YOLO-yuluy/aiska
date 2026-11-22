/* 凌箭航天 · 博主接单台 —— Electron 入口
   加载 boss.html，提供原生 Windows 窗口 + 系统通知 */
const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 1060,
        height: 800,
        minWidth: 860,
        minHeight: 600,
        title: "凌箭航天 · 博主接单台",
        icon: path.join(__dirname, "assets", "images", "favicon.png"),
        backgroundColor: "#05080F",
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true
        }
    });

    win.loadFile("boss.html");

    /* 抖音视频链接等外部链接交给系统浏览器打开 */
    win.webContents.setWindowOpenHandler(function (details) {
        shell.openExternal(details.url);
        return { action: "deny" };
    });
}

app.whenReady().then(function () {
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    app.quit();
});
