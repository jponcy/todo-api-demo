import { Tag, Todo } from './models';
import { Repository } from './repository';

const todos = [
  new Todo(
    'Installation du poste',
    `Utilisation de <ul>
        <li>node/npm<li>
        <li>@angular/cli (npm i -g @angular/cli)</li>
        <li>Vérification de l\'installation</li>
      </ul>`).complete().addTag(1),
  new Todo('Créer un nouveau projet', 'Utilisation de la command "ng new" après avoir installé @angular/cli').complete(),
  new Todo('Créer un module').addTag(3),
  new Todo('Récupération de la liste des tâches').addTag(2, 4),
  new Todo('Affichage barré/grisé des tâches finies').addTag(5),
  new Todo('Convertion du snake case vers du CamelCase').addTag(2),
  new Todo('Implémentation de cloture d\'une tâche').addTag(2, 5),
  new Todo('Implémentation de la suppression d\'une tâche').addTag(2),
  new Todo('Implémentation du nettoyage', 'Suppression de toutes les tâches finies').addTag(2, 3),
  new Todo('Récupération de la liste des tags').addTag(2),
]

const tags = [
  new Tag('Installation', 'beige'),
  new Tag('Api', 'orange'),
  new Tag('Facultatif', 'silver'),
  new Tag('Urgent', 'red'),
  new Tag('IHM', 'aqua'),
]

export const db = {
  data: { todos, tags, },
  todoRepository: new Repository(todos),
  tagRepository: new Repository(tags)
}
