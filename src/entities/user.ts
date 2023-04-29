import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "../resolvers/message";
@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn()
  @Field(() => String)
  created: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updated: Date;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  username: string;
}

@ObjectType()
export class Login {
  @Field(() => String)
  access_Token: string;
  @Field(() => User)
  user: User;
}

@InputType()
export class dataUpdate {
  @Field(() => String, { nullable: true })
  username: string;
  @Field(() => String, { nullable: true })
  password: string;
  @Field(() => String, { nullable: true })
  email: string;

  @OneToMany(() => Message, (Message) => Message.author)
   msg: Message[];
}
