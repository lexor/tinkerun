const {ipcMain} = require('electron')

const {selectDirectory, selectFile} = require('./utils/selectFileOrDirectory')
const {allLocales} = require('./utils/allLocales')
const {quickConnection} = require('./constants')
const {getIntlConfig} = require('./locale')
const {createEditorWindow} = require('./createEditorWindow')
const {connectionContextMenu} = require('./connectionContextMenu')
const {snippetContextMenu} = require('./snippetContextMenu')
const {Inspiring} = require('./Inspiring')
const {
  deleteConnection,
  createConnection,
  updateConnection,
  allConnections,
  getConnection,
  inputConnection,
  inputConnectionClearLine,
  closeConnection,
  connectConnection,
  reconnectConnection,
} = require('./services/connections')
const {setLocale, getLocale, allConfig, setConfig} = require('./services/config')
const {createSnippet, allSnippets, updateSnippet, deleteSnippet} = require('./services/snippets')

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

ipcMain.on('allConfig', event => {
  event.returnValue = allConfig()
})

ipcMain.on('setConfig', (event, config) => {
  setConfig(config)
})

ipcMain.on('allLocales', event => {
  event.returnValue = allLocales
})

ipcMain.on('getIntlConfig', event => {
  event.reply('setIntlConfig', getIntlConfig())
})

ipcMain.on('createConnection', (event, connection) => {
  createConnection(connection)
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

ipcMain.on('reconnectConnection', async (event, connection) => {
  reconnectConnection(connection)
})

ipcMain.on('inputConnection', (event, id, code) => {
  inputConnection(id, code)
})

ipcMain.on('inputConnectionClearLine', (event, id) => {
  inputConnectionClearLine(id)
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

ipcMain.on('createSnippet', (event, connectionId, snippet) => {
  createSnippet(connectionId, snippet)
})

ipcMain.on('updateSnippet', (event, connectionId, snippet) => {
  updateSnippet(connectionId, snippet)
})

ipcMain.on('allSnippets', (event, connectionId) => {
  event.returnValue = allSnippets(connectionId)
})

ipcMain.on('deleteSnippet', (event, connectionId, snippetId) => {
  deleteSnippet(connectionId, snippetId)
})

ipcMain.on('popupSnippetContextMenu', (event, connectionId, snippetId) => {
  snippetContextMenu(connectionId, snippetId).popup()
})
