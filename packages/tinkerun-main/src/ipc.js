const {ipcMain} = require('electron')

const {selectDirectory, selectFile} = require('./utils/selectFileOrDirectory')
const {allLocales} = require('./utils/allLocales')
const {quickConnection} = require('./constants')
const {getIntlConfig} = require('./locale')
const {createEditorWindow} = require('./createEditorWindow')
const {connectionContextMenu} = require('./connectionContextMenu')
const {Inspiring} = require('./Inspiring')
const {
  deleteConnection,
  createConnection,
  updateConnection,
  allConnections,
  getConnection,
  inputConnection,
  closeConnection,
  connectConnection,
} = require('./services/connections')
const {setLocale, getLocale} = require('./services/config')

ipcMain.on('selectDirectory', (event, defaultPath) => {
  event.returnValue = selectDirectory(defaultPath)
})

ipcMain.on('selectFile', (event, defaultPath) => {
  event.returnValue = selectFile(defaultPath)
})

ipcMain.on('setLocale', (event, lang) => {
  setLocale(lang)
})

ipcMain.on('getLocale', event => {
  event.returnValue = getLocale()
})

ipcMain.on('allLocales', event => {
  event.returnValue = allLocales
})

ipcMain.on('getIntlConfig', event => {
  event.reply('setIntlConfig', getIntlConfig())
})

ipcMain.on('createConnection', event => {
  event.returnValue = createConnection()
})

ipcMain.on('getConnection', (event, id) => {
  event.returnValue = getConnection(id)
})

ipcMain.on('deleteConnection', (event, id) => {
  deleteConnection(id)
})

ipcMain.on('allConnections', event => {
  event.returnValue = allConnections()
})

ipcMain.on('updateConnection', (event, connection) => {
  updateConnection(connection)
})

ipcMain.on('connectConnection', async (event, connection) => {
  updateConnection(connection)
  await connectConnection(connection)
})

ipcMain.on('inputConnection', (event, id, code) => {
  inputConnection(id, code)
})

ipcMain.on('closeConnection', async (event, id) => {
  await closeConnection(id)
})

ipcMain.on('quickConnect', async event => {
  const path = selectDirectory()
  if (path) {
    await createEditorWindow({
      ...quickConnection,
      path,
    })
  }
})

ipcMain.on('inspire', event => {
  event.returnValue = Inspiring.quote()
})

ipcMain.on('popupConnectionContextMenu', (event, id) => {
  connectionContextMenu(id).popup()
})
