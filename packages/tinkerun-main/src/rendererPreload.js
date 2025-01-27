const {contextBridge, ipcRenderer} = require('electron')
const queryString = require('query-string')

const connectionId = () => queryString.parse(global.location.search).id

contextBridge.exposeInMainWorld('api', {
  selectDirectory: defaultPath => ipcRenderer.sendSync('selectDirectory', defaultPath),
  selectFile: defaultPath => ipcRenderer.sendSync('selectFile', defaultPath),
  setLocale: locale => ipcRenderer.send('setLocale', locale),
  getLocale: () => ipcRenderer.sendSync('getLocale'),
  allConfig: () => ipcRenderer.sendSync('allConfig'),
  setConfig: data => ipcRenderer.send('setConfig', data),
  allLocales: () => ipcRenderer.sendSync('allLocales'),
  getIntlConfig: () => ipcRenderer.send('getIntlConfig'),
  inspire: () => ipcRenderer.sendSync('inspire'),
  createConnection: connection => ipcRenderer.send('createConnection', connection),
  getConnection: () => ipcRenderer.sendSync('getConnection', connectionId()),
  deleteConnection: id => ipcRenderer.send('deleteConnection', id),
  allConnections: () => ipcRenderer.sendSync('allConnections'),
  updateConnection: connection => ipcRenderer.send('updateConnection', connection),
  connectConnection: connection => ipcRenderer.send('connectConnection', connection),
  reconnectConnection: connection => ipcRenderer.send('reconnectConnection', connection),
  quickConnect: () => ipcRenderer.send('quickConnect'),
  popupConnectionContextMenu: id => ipcRenderer.send('popupConnectionContextMenu', id),
  inputConnection: code => ipcRenderer.send('inputConnection', connectionId(), code),
  closeConnection: () => ipcRenderer.send('closeConnection', connectionId()),
  inputConnectionClearLine: () => ipcRenderer.send('inputConnectionClearLine', connectionId()),

  onSetIntlConfig: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('setIntlConfig', listener)
    return {
      dispose: () => ipcRenderer.off('setIntlConfig', listener),
    }
  },

  onSetConfig: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('setConfig', listener)
    return {
      dispose: () => ipcRenderer.off('setConfig', listener),
    }
  },

  onOutputConnection: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('outputConnection', listener)
    return {
      dispose: () => ipcRenderer.off('outputConnection', listener),
    }
  },

  onDeleteConnectionConfirm: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('deleteConnectionConfirm', listener)
    return {
      dispose: () => ipcRenderer.off('deleteConnectionConfirm', listener),
    }
  },

  onReconnectConnection: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('reconnectConnection', listener)
    return {
      dispose: () => ipcRenderer.off('reconnectConnection', listener),
    }
  },

  createSnippet: snippet => ipcRenderer.send('createSnippet', connectionId(), snippet),
  updateSnippet: snippet => ipcRenderer.send('updateSnippet', connectionId(), snippet),
  deleteSnippet: id => ipcRenderer.send('deleteSnippet', connectionId(), id),
  allSnippets: () => ipcRenderer.sendSync('allSnippets', connectionId()),
  popupSnippetContextMenu: id => ipcRenderer.send('popupSnippetContextMenu', connectionId(), id),

  onDeleteSnippetConfirm: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('deleteSnippetConfirm', listener)
    return {
      dispose: () => ipcRenderer.off('deleteSnippetConfirm', listener),
    }
  },
})
