import { GraphQLSchema, specifiedDirectives } from 'graphql';
import { gql } from 'graphql-tag';
import {
  buildSchema,
  BuildSchemaOptions,
  createResolversMap,
} from 'type-graphql';
import { buildSubgraphSchema, printSubgraphSchema } from '@apollo/subgraph';
import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper';
import { directivesWithNoDefinitionNeeded } from '@apollo/subgraph/dist/directives';
import { addResolversToSchema } from 'apollo-graphql';

export async function buildSchemaWithSubgraph(
  options: Omit<BuildSchemaOptions, 'skipCheck'>,
  referenceResolvers?: GraphQLResolverMap<any>
) {
  const schema = await buildSchema({
    ...options,
    directives: [
      ...specifiedDirectives,
      ...directivesWithNoDefinitionNeeded,
      ...(options.directives || []),
    ],
    skipCheck: true,
  });

  const federatedSchema = buildSubgraphSchema({
    typeDefs: gql(printSubgraphSchema(schema)),
    resolvers: createResolversMap(schema) as GraphQLResolverMap<GraphQLSchema>,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }
  return federatedSchema;
}
