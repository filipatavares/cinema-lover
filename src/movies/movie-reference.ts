import movies from './data';
import Movie from './movie';

export function resolveMovieReference(reference: Pick<Movie, 'id'>) {
  return movies.find((u) => u.id === reference.id);
}
