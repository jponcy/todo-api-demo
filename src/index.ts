import * as jsonServer from 'json-server';

import { db } from './db';
import { TodoController } from './todos.controller';

// TODO: Export to another file.

const server      = jsonServer.create()
const router      = jsonServer.router(db.data)
const middlewares = jsonServer.defaults()
const port        = 8080

server.use(middlewares)

server.use(jsonServer.bodyParser) // Needed to be able to write in request.
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.created_at = Date.now()
    req.body.updated_at = Date.now()
  } else if (req.method === 'PUT') {
    req.body.updated_at = Date.now()
  }

  // Continue to JSON Server router
  next()
})

// Map constrollers.
new TodoController(server, db.todoRepository)

server.use(router)
server.listen(port, () => console.log(`JSON Server is running on http://localhost:${port}`))
