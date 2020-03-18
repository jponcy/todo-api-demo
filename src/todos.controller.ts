import { Application, Request, Response } from 'express';

import { Todo } from './models';
import { Repository } from './repository';

export class TodoController {
  constructor(readonly server: Application, private readonly repository: Repository<Todo>) {
    server.put(   '/todos/:id/complete',   this.complete)
    server.put(   '/todos/:id/uncomplete', this.uncomplete)
    server.delete('/todos/clear',          this.clear)
  }

  /**
   * Marks a todo as completed.
   */
  private complete = (req: Request, res: Response) => this.actionOnOne(req, res, todo => {
    if (todo.finished_at) {
      res.status(400).jsonp({error: 'TODO already completed'})
    } else {
      todo.complete()
      res.jsonp(todo)
    }
  })

  /**
   * Unmarks a todo as completed.
   */
  private uncomplete = (req: Request, res: Response) => this.actionOnOne(req, res, todo => {
    if (todo.finished_at) {
      todo.uncomplete()
      res.jsonp(todo)
    } else {
      res.status(400).jsonp({error: 'TODO already completed'})
    }
  })

  private clear = (req: Request, res: Response) => {
    this.repository.deleteIf(todo => todo.finished_at)
    res.json(this.repository.findAll())
  }

  /**
   * Generalizes data retriving & error managing for action on one entity.
   * @param req
   * @param res
   * @param action
   */
  private actionOnOne(req: Request, res: Response, action: (todo: Todo) => any) {
    const id = +req.params.id
    let todo: Todo

    if (id && (todo = this.repository.find(id))) {
      action(todo)
    } else {
      res.status(404).jsonp({error: 'Not found'})
    }
  }
}
