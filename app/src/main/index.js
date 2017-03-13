'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Exif
const exif = require('exiftool')
const path = require('path')
// TODO: Support win, linux
const exiftoolPath = process.env.NODE_ENV === 'development'
  ? path.join(__dirname, '../../bin/osx/exiftool')
  : path.join(process.resourcesPath, 'app/bin/osx/exiftool')
console.log('exiftoolPath', exiftoolPath)
console.log('process.cwd()', process.cwd())
ipcMain.on('requestFileExif', (event, arg) => {
  console.log('requestFileExif arg', arg)
  const sender = event.sender
  const path = arg

  exif.metadata(path, [], exiftoolPath, (err, metadata) => {
    if (err) {
      console.error('Exif error')
      sender.send(`errorFileExif-${path}`, err)
    } else {
      const res = {
        date: metadata.mediaCreateDate || metadata['date/timeOriginal'],
        duration: metadata.mediaDuration || null,
        width: metadata.imageWidth,
        height: metadata.imageHeight
      }
      sender.send(`receiveFileExif-${path}`, res)
    }
  })
})
