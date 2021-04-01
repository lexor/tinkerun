import {atom} from 'jotai'
import compact from 'lodash/compact'

import {inputConnection, getConnection, inputConnectionClearLine} from '../utils/api'

const connectionAtom = atom(getConnection())
const sizesAtom = atom([])
const outputAtom = atom('')
const outputTabIndexAtom = atom(0)
const inputAtom = atom([])

// 执行代码
const runAtom = atom(null, (get, set, code) => {
  if (get(outputTabIndexAtom) !== 1) {
    // 展示 output
    set(outputTabIndexAtom, 1)
  }

  set(outputAtom, '')
  let codeArr = code.split('\n')
  codeArr = compact(codeArr)
  set(inputAtom, codeArr)

  // 清除命令行已输入的内容
  inputConnectionClearLine()

  for (const codeItem of codeArr) {
    inputConnection(`${codeItem}\r`)
  }
})

// 增加 output 数据
const appendOutputAtom = atom(null, (get, set, update) => {
  set(outputAtom, prev => `${prev}${update}`)
})

// 清空 output
const clearOutputAtom = atom(null, (get, set, update) => {
  set(outputAtom, '')
})

export {
  connectionAtom,
  sizesAtom,
  outputAtom,
  outputTabIndexAtom,
  inputAtom,
  runAtom,
  appendOutputAtom,
  clearOutputAtom,
}
