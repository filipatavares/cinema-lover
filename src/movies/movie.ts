import { Field, ObjectType, ID, Directive } from 'type-graphql';
import Director from './director/director';

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Movie {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  year: number;

  @Field(() => Director)
  director: Director;
}
