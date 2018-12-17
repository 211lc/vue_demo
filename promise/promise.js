const fs = require('fs')
const path = require('path')

// fs.readFile(path.join(__dirname, './files/1.txt'), 'utf-8', (err, data) => {
//   if(err) throw err
//   console.log(data)
// })
// function readFun(fpath, callback) {
//   fs.readFile(fpath, 'utf-8', (err, data) => {
//     if(err) callback(err)
//     callback(null, data)
//   })
// }

// readFun(path.join(__dirname, './files/22.txt'), (err, data) => {
//   if(err) return console.log(err.message)
//   console.log(data)
// })

// 第三版=================================
function readFun(fpath, sucCb, errCb) {
  fs.readFile(fpath, 'utf-8', (err, data) => {
    if(err) return errCb(err)
    sucCb(data)
  })
}
readFun(path.join(__dirname, './files/1.txt'), (data) => {
  console.log(data)
}, (err) => {
  console.log(err.message)
})