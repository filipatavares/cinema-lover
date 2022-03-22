import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { MoviesDirectorResolver, MoviesResolver } from './resolvers';
import { buildSchemaWithSubgraph } from '../helpers/buildSchemaWithSubgraph';
import Director from './director/director';
import { resolveMovieReference } from './movie-reference';
import DirectorMoviesResolver from './director/resolver';

export async function start(port: number): Promise<string> {
  const schema = await buildSchemaWithSubgraph(
    {
      resolvers: [
        MoviesResolver,
        MoviesDirectorResolver,
        DirectorMoviesResolver,
      ],
      orphanedTypes: [Director],
    },
    {
      Movie: { __resolveReference: resolveMovieReference },
    }
  );

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen({ port });
  return url;
}

start(3002)
  .then((url) => console.log(`🚀 Movies service ready at ${url} 🚀`))
  .catch(() => console.log('Something went wrong. Abort mission!'));
