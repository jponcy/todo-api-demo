import { Entity } from './models';

export class Repository<T extends Entity> {
  constructor(private store: T[]) {}

  /** Returns the list of entities. */
  findAll() {
    return this.store.map(a => a) // Returns clone.
  }

  /** Returns one entity for given {@code id}. */
  find(id: number) {
    return this.store.find(e => e.id === id) || null
  }

  deleteIf(predicate: (elt: T) => any) {
    this.store = this.store.filter(entity => !predicate(entity))
  }
}
