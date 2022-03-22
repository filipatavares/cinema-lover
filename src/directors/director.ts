import { Field, ObjectType, ID, Directive } from 'type-graphql';

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Director {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
