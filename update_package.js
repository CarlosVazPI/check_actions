const fs = require('fs')

let data = JSON.parse(fs.readFileSync('package.json'))
let newData = {
  ...data,
  version: data.version + 1
}
fs.writeFileSync('package.json', JSON.stringify(newData))
console.log(newData)
