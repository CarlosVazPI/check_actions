const fs = require('fs')

const branchName = process.argv[2]
const data = JSON.parse(fs.readFileSync('package.json'))
const newData = {
  ...data,
  branchName,
  version: data.version + 1,
}
fs.writeFileSync('package.json', JSON.stringify(newData))
console.log(newData)
