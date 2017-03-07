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
const fs = require('fs')
ipcMain.on('requestFileExif', (event, arg) => {
  console.log('requestFileExif arg', arg)
  const sender = event.sender
  const path = arg

  fs.readFile(path, (err, data) => {
    if (err) {
      sender.send(`errorFileExif-${path}`, err)
      return
    }
    exif.metadata(data, (err, metadata) => {
      if (err) {
        sender.send(`errorFileExif-${path}`, err)
      } else {
        console.log('metadata', metadata)
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
})
