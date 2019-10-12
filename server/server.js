const express = require('express')
const app = express()

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
