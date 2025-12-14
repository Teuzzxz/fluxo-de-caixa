import { app, BrowserWindow, Menu } from "electron"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Menu.setApplicationMenu(null)

const isDev = process.env.NODE_ENV === "development"

function createWindow() {
   const win = new BrowserWindow({
      width: 1100,
      height: 700,
      icon: path.join(__dirname, "build", "icon.ico"),
      webPreferences: {
         contextIsolation: true,
      },
   })

   win.loadURL("https://app.backroom.website")

   // if (isDev) {
   //    win.loadURL("http://localhost:5173")
   // } else {
   //    win.loadFile(path.join(__dirname, "../dist/index.html"))
   // }
}

app.whenReady().then(() => {
   createWindow()

   app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
   })
})
