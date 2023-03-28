importScripts('https://unpkg.com/pinyin-pro@3.12.0/dist/index.js') //需要引入的第三方库
importScripts('./workerpool.js') //workerpool核心文件
const getPinYin = val => {
  var { pinyin } = pinyinPro
  if (val) {
    return pinyin(val, {
      toneType: 'none',
      type: 'array'
    }).join('')
  } else {
    return val
  }
}
const handlePinyin = spell => {
  // return spellData.map(item => {
  //   if (item.menuName3.indexOf('/') != -1) {
  //     item.menuName3 = item.menuName3.replace('/', '|')
  //   }
  //   return {
  //     contents: item.contents,
  //     contentsSpell: getPinYin(item.contents),
  //     menuNameSpell: `${getPinYin(item.menuName1)}-${
  //       item.menuName1
  //     }/${getPinYin(item.menuName2)}-${item.menuName2}/${getPinYin(
  //       item.menuName3
  //     )}-${item.menuName3}`
  //   }
  // })
  return getPinYin(spell)
}
workerpool.worker({
  handlePinyin //把要在主线程中使用的方法放在worker环境中
})
