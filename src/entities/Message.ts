import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
@ObjectType()
export class Message extends BaseEntity {
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
  message: string;  

  @ManyToOne(() => User, (User) => User.msg, {
    cascade: true,
  })
  author: User;

  @ManyToOne(() => User, (User) => User.msg, {
    cascade: true,
  })
  recever: User;
}
