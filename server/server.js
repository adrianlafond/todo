const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.get('/v1/todos', (_req, res)=> {
  fs.readFile('./data.json', (err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      try {
        res.set('Content-Type', 'application/json')
        res.send(JSON.parse(data).todos)
      } catch (_error) {
        res.sendStatus(500)
      }
    }
  })
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
