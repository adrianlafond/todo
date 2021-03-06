const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Perhaps a static HTML site later:
// app.use(express.static('public'))
// app.get('/', (_req, res) => {
//   res.sendFile(`${__dirname}/index.html`)
// })

function readData(callback) {
  fs.readFile('./data.json', (err, data) => {
    if (err) {
      callback(err)
    } else {
      try {
        const todos = JSON.parse(data)
        callback(null, todos)
      } catch (jsonError) {
        callback(jsonError)
      }
    }
  })
}

function writeData(data, callback) {
  fs.writeFile('./data.json', JSON.stringify(data, null, '  '), err => {
    callback(err)
  })
}

function createState(todos) {
  if (!todos.state) {
    todos.state = JSON.parse(JSON.stringify(todos.base))
  }
}

app.get('/v1/todos', (_req, res) => {
  // res.sendStatus(500)
  readData((err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.set('Content-Type', 'application/json')
      res.send(data.todos.state || data.todos.base)
    }
  })
})

app.get('/v1/todo/:id', (req, res) => {
  // sendStatus(500)
  readData((err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      const todos = data.todos.state || data.todos.base
      const id = +req.params.id
      const index = todos.findIndex(item => item.id === id)
      if (index === -1) {
        res.sendStatus(404)
      } else {
        res.set('Content-Type', 'application/json')
        res.send(todos[index])
      }
    }
  })
})

app.post('/v1/todo', (req, res) => {
  readData((err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      createState(data.todos)
      data.meta.highestIndex += 1
      const todo = {
        id: data.meta.highestIndex,
        complete: req.body.complete || false,
        text: req.body.text || '',
        notes: req.body.notes || '',
      }
      data.todos.state.push(todo)
      writeData(data, err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.set('Content-Type', 'application/json')
          res.send(todo)
        }
      })
    }
  })
})

app.put('/v1/reset', (_req, res) => {
  readData((err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      data.todos.state = null
      writeData(data, err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.set('Content-Type', 'application/json')
          res.send(data.todos.base)
        }
      })
    }
  })
})

app.put('/v1/todo/:id', (req, res) => {
  readData((err, data) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      createState(data.todos)
      const id = +req.params.id
      const index = data.todos.state.findIndex(item => item.id === id)
      if (index === -1) {
        res.sendStatus(400)
      } else {
        try {
          data.todos.state[index] = {
            ...data.todos.state[index],
            ...req.body
          }
        } catch (_error) {
          res.sendStatus(400)
          return
        }
        writeData(data, err => {
          if (err) {
            res.sendStatus(500)
          } else {
            res.set('Content-Type', 'application/json')
            res.send(data.todos.state[index])
          }
        })
      }
    }
  })
})

app.delete('/v1/todo/:id', (req, res) => {
  readData((err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      const id = +req.params.id
      const index = data.todos.state.findIndex(item => item.id === id)
      if (index === -1) {
        res.sendStatus(400)
      } else {
        data.todos.state.splice(index, 1)
        writeData(data, err => {
          if (err) {
            res.sendStatus(500)
          } else {
            res.end()
          }
        })
      }
    }
  })
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
