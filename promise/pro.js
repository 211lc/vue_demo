const fs = require('fs')
const path = require('path')
function proFun(fpath) {
  const pro = new Promise(function(resolve, reject) {
    fs.readFile(fpath, 'utf-8', (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
  return pro
}
const p = proFun(path.join(__dirname, './files/1.txt'))
// p.then(data => {
//   console.log(data)
// }, err => {
//   console.log(err)
// })
// 使用promise解决回调地狱
p.then(data => {
  console.log(data)
  return proFun(path.join(__dirname, './files/2.txt'))
}).then(data => {
  console.log(data)
}).catch(err => { 
  console.log(err.message)
})