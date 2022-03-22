import { Resolver, FieldResolver, Root, ResolverInterface } from 'type-graphql';
import Director from './director';
import movies from '../data';

@Resolver(() => Director)
export default class DirectorMoviesResolver {
  @FieldResolver()
  movies(@Root() director: Director) {
    return movies.filter((movie) => movie.director === director.id);
  }
}
