import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import movies from './data';
import Director from './director/director';
import Movie from './movie';

@Resolver(() => Movie)
export class MoviesResolver {
  @Query(() => [Movie])
  movies() {
    return movies;
  }
}

@Resolver(() => Movie)
export class MoviesDirectorResolver {
  @FieldResolver(() => Director)
  director(@Root() movie: Omit<Movie, 'director'> & { director: string }) {
    return { __typename: 'Director', id: movie.director };
  }
}
