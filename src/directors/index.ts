import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import DirectorsResolver from './resolver';
import { buildSchemaWithSubgraph } from '../helpers/buildSchemaWithSubgraph';
import { resolveDirectorReference } from './director-reference';

async function start(port: number) {
  const schema = await buildSchemaWithSubgraph(
    {
      resolvers: [DirectorsResolver],
    },
    {
      Director: { __resolveReference: resolveDirectorReference },
    }
  );

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen({ port });
  return url;
}

start(3001)
  .then((url) => console.log(`🚀 Directors service ready at ${url} 🚀`))
  .catch(() => console.log('Something went wrong. Abort mission!'));
