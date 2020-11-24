const glob = require('glob')
const path = require('path')
// 配置pages多页面获取当前文件夹下的html和js
function getEntry (globPath) {
  let [entries, basename] = [{}, '']
  let template
  let filename
  let title
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    template = `public/${basename}.html` + ''
    filename = `${basename}.html`
    title = `${basename} Page`
    entries[basename] = {
      entry,
      template,
      filename,
      title,
      chunks: ['chunk-vendors', 'chunk-common', basename]
    }
  })

  return entries
}

module.exports = getEntry
