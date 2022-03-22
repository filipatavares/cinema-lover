import Movie from '../movie';
import { Directive, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Directive('@extends')
@Directive(`@key(fields: "id")`)
export default class Director {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => [Movie], { nullable: true })
  movies: Movie[];
}
