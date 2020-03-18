export interface Entity {
  /** Technical ID. */
  id: number
}

class FakeEntity implements Entity {
  protected static idGenerator = {}

  id: number

  /** The date of creation of this task. */
  created_at: Date

  /** The date of last update of this task. */
  updated_at: Date
//"dev": "npx tsc-watch src/index.ts --module commonjs --moduleResolution classic --alwaysStrict --outDir dist/ --onSuccess  \"node dist/index.js\""
  /** Constructor. */
  constructor() {
    if (!FakeEntity.idGenerator[this.constructor.name]) {
      FakeEntity.idGenerator[this.constructor.name] = 0
    }

    this.id = ++FakeEntity.idGenerator[this.constructor.name]

    this.created_at = this.updated_at = new Date()
  }
}

export class Todo extends FakeEntity {

  /** The date of completion of this todo. */
  finished_at: Date = null

  /** List of linked tags. */
  tags: number[] = []

  /**
   * Constructor.
   * @param label       The label of the task.
   * @param description The description of thger task.
   */
  constructor(public label: string, public description: string = '') {
    super()
    this.description = this.description ? this.description.replace(/\s+/g, ' ') : null
  }

  complete(): this {
    this.finished_at = new Date()
    return this
  }

  uncomplete(): this {
    this.finished_at = null
    return this
  }

  addTag(...tagIds: number[]): this {
    tagIds.forEach(tag => this.tags.push(tag))
    return this
  }
}

export class Tag extends FakeEntity {

  /**
   * Constructor.
   * @param name  The tag name.
   * @param color The color to use to represent this tag (CSS color).
   */
  constructor(public name: string, public color: string)
  { super() }
}
