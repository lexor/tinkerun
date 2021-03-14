const {BrowserWindow} = require('electron')

const {config} = require('../database/config')
const {getIntlConfig, setIntl} = require('../locale')

/**
 * @param {string} lang
 */
const setLocale = lang => {
  config.set('locale', lang)
  const res = getIntlConfig()
  setIntl(res)

  // send the setIntlConfig event to all the windows opened
  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send('setIntlConfig', res)
  }
}

/**
 * @returns {string}
 */
const getLocale = () => config.get('locale', 'en')

module.exports = {
  setLocale,
  getLocale,
}