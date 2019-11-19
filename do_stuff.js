// const https = require('https')
const { exec } = require('child_process')

const run = (command) => () => {
  return new Promise((resolve, reject) => {
    console.log("\x1b[36m", '> ', command)
    exec(command, (error, stdout, stderr) => {
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
  .then(run('git clone https://github.com/Intellection/fluid.framework.git'))
  .then(run('cd fluid.framework'))
  .then(run(`git checkout -b automatic_${branch}`))
  .then(run(`node update_package ${branch}`))
  .then(run(`git commit -am "Automatically pointing to '${branch}'"`))
  .then(run('git push'))
// exec('git clone https://github.com/Intellection/fluid.framework.git', (error, stdout, stderr) => {
//   if (error || stderr) {
//     console.log('Error', error || stderr)
//     exec(`echo "Error: ${error || stderr}" >> .log`)
//     return
//   }
//   exec('cd fluid.framework', (error, stdout, stderr) => {
//     if (error || stderr) {
//       console.log('Error', error || stderr)
//       exec(`echo "Error: ${error || stderr}" >> .log`)
//       return
//     }
//     exec(`git checkout -b automatic_${branch}`, (error, stdout, stderr) => {
//       if (error || stderr) {
//         console.log('Error', error || stderr)
//         exec(`echo "Error: ${error || stderr}" >> .log`)
//         return
//       }
//       exec(`node update_package ${branch}`, (error, stdout, stderr) => {
//         if (error || stderr) {
//           console.log('Error', error || stderr)
//           exec(`echo "Error: ${error || stderr}" >> .log`)
//           return
//         }
//         exec(`git commit -am "Automatically pointing to "${branch}"`, (error, stdout, stderr) => {
//           if (error || stderr) {
//             console.log('Error', error || stderr)
//             exec(`echo "Error: ${error || stderr}" >> .log`)
//             return
//           }
//           exec('git push', (error, stdout, stderr) => {
//             if (error || stderr) {
//               console.log('Error', error || stderr)
//               exec(`echo "Error: ${error || stderr}" >> .log`)
//               return
//             } else {
//               exec(`echo "Success: ${stdout}" >> .log`)
//               console.log(stdout)
//             }
//           })
//         })
//       })
//     })
//   })
// })
//
//
// // const data = {
// //   base: 'master',
// //   branch: `${branch}-extra`,
// //   title: `Point to ui branch ${branch}`,
// //
// // }
// // const options = {
// //   hostname: 'https://api.github.com',
// //   port: 443,
// //   path: '/repos/CarlosVazPI/check_actions/pulls',
// //   method: 'POST',
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Content-Length': data.length
// //   }
// // }
// //
// // const req = https.request(options)
// //
// //
// //
// //
// // req.write(data)
// // req.end()
