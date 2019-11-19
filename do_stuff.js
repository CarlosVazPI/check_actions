// const https = require('https')
const { exec } = require('child_process')

const run = (command, options) => () => {
  return new Promise((resolve, reject) => {
    console.log("\x1b[36m", '> ', command)
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.log("\x1b[31m", '< ', command, error)
        exec(`echo "Error: ${error, stderr}" >> .log`)
      } else {
        console.log("\x1b[32m", '< ', command, stdout)
        if (stderr) {
          console.log("\x1b[37m", '  ', stderr)
        }
        resolve(stdout)
      }
    })
  })
}

//
// https.get('https://api.github.com/repos/CarlosVazPI/check_actions/git/ref/heads/master-more-5fb914b', (resp) => {
//   let data = ''
//   resp.on('data', (chunk) => {
//     data += chunk;
//   })
// }).on('error', console.error)

const branch = process.argv[2]
run('rm .log')()
  .then(run('touch .log'))
  .then(run('rm -rf fluid.framework'))
  .then(run('git clone https://github.com/Intellection/fluid.framework.git'))
  .then(run('cd fluid.framework'))
  .then(run(`git checkout -b automatic_${branch}`, { cwd: './fluid.framework' }))
  .then(run(`node ../update_package ${branch}`, { cwd: './fluid.framework' }))
  .then(run(`git commit -am "Automatically pointing to '${branch}'"`, { cwd: './fluid.framework' }))
  .then(run(`git push --set-upstream origin automatic_${branch}`, { cwd: './fluid.framework' }))
// exec('git clone https://github.com/Intellection/fluid.framework.git', (error, stdout, stderr) => {
//   if (error || stderr) {
//     console.log('Error', error || stderr)
//     exec(`echo "Error: ${error || stderr}" >> .log`)
//     return
//   }
// }
//
// const req = https.request(options)
//
//
//
//
// req.write(data)
// req.end()
