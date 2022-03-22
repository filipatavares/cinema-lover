import directors from './data';
import Director from './director';

export function resolveDirectorReference(reference: Pick<Director, 'id'>) {
  return directors.find((u) => u.id === reference.id);
}
