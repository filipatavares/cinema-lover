import 'reflect-metadata';
import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';

async function start(port: number): Promise<string> {
  const supergraphSdl = readFileSync('./supergraph.graphql').toString();

  const gateway = new ApolloGateway({
    supergraphSdl,
  });

  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
  });

  const { url } = await server.listen({ port });
  return url;
}

start(3000)
  .then((url) => console.log(`🚀 Apollo Gateway ready at ${url} 🚀`))
  .catch(() => console.log('Something went wrong. Abort mission!'));
