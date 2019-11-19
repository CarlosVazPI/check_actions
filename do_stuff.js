// const https = require('https')
const { exec } = require('child_process')

//
// https.get('https://api.github.com/repos/CarlosVazPI/check_actions/git/ref/heads/master-more-5fb914b', (resp) => {
//   let data = ''
//   resp.on('data', (chunk) => {
//     data += chunk;
//   })
// }).on('error', console.error)

const branch = process.argv[2]
exec('echo "Doing it" > .log', (error, stdout, stderr) => {
  console.log('done')
})
exec('git clone https://github.com/Intellection/fluid.framework.git', (error, stdout, stderr) => {
  if (error || stderr) {
    console.log(error || stderr)
    return
  }
  exec('cd fluid.framework', (error, stdout, stderr) => {
    if (error || stderr) {
      console.log(error || stderr)
      return
    }
    exec(`git checkout -b automatic_${branch}`, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log(error || stderr)
        return
      }
      exec(`node update_package ${branch}`, (error, stdout, stderr) => {
        if (error || stderr) {
          console.log(error || stderr)
          return
        }
        exec(`git commit -am "Automatically pointing to "${branch}"`, (error, stdout, stderr) => {
          if (error || stderr) {
            console.log(error || stderr)
            return
          }
          exec('git push', (error, stdout, stderr) => {
            if (error || stderr) {
              console.log(error || stderr)
              return
            } else {
              console.log(stdout)
            }
          })
        })
      })
    })
  })
})


// const data = {
//   base: 'master',
//   branch: `${branch}-extra`,
//   title: `Point to ui branch ${branch}`,
//
// }
// const options = {
//   hostname: 'https://api.github.com',
//   port: 443,
//   path: '/repos/CarlosVazPI/check_actions/pulls',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length
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
