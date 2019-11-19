const https = require('https')
const base = process.argv[2]
const data = JSON.stringify({
  base,
  body: '[WIP] Do not merge. Automatig PR test',
  head: 'master',
  title: '[WIP] Do not merge'
})
const options = {
  headers: {
    'Content-Length': data.length,
    'Content-Type': 'application/json',
    'User-Agent': 'CarlosVazPI'
  },
  hostname: 'api.github.com',
  method: 'POST',
  path: '/repos/CarlosVazPI/check_actions/pulls'
  // rejectUnauthorized: false
}
const req = https.request(options, (resp) => {
  console.log('statusCode:', resp.statusCode);
  console.log('headers:', resp.headers);
  // console.log(resp)

  resp.on('data', (d) => {
    process.stdout.write(d);
  })
}).on('error', console.error)

req.write(data)
req.end()
