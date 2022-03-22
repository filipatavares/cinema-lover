import { Resolver, Query } from 'type-graphql';
import Director from './director';
import directors from './data';

@Resolver(() => Director)
export default class DirectorsResolver {
  @Query(() => [Director])
  directors() {
    return directors;
  }
}
