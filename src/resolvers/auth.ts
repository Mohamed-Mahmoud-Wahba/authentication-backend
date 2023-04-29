import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/user";
import { Login } from "../entities/user";
import { dataUpdate } from "../entities/user";
@Resolver()
export class Auth {
  @Query(() => String)
  Register(): string {
    return "Hello World!";
  }
  ////////////////////////////////////////////////Start SingUp/////////////////////////////////////////////
  @Mutation(() => User)
  async SingUp(
    @Arg("username", () => String)
    username: string,
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string
  ): Promise<User | any> {
    try {
      const ckeckUser = await User.findOne({
        where: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      });
      console.log("first", ckeckUser);
      if (ckeckUser) {
        const error = new Error("this user is already registered ");
        throw error;
      }
      const hashedPw = await bcrypt.hash(password, 12);
      return User.create({ email, password: hashedPw, username }).save();
    } catch (err) {
      console.log(err);
    }
  }
  ////////////////////////////////////////////////End SingUp/////////////////////////////////////////////
  ////////////////////////////////////////////////Start SingIn///////////////////////////////////////////
  @Mutation(() => Login)
  async SingIn(
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string
  ): Promise<Login | any> {
    try {
      const ckeckUser = await User.findOne({
        where: [
          {
            email: email,
          },
        ],

      });
      if (!ckeckUser) {
        const error = new Error("this user is not found");
        throw error;
      }
      const compare = await bcrypt.compare(password, ckeckUser.password);
      if (compare) {
        const access_Token = jwt.sign({ id: ckeckUser.id }, "mohamed");
        return { user: ckeckUser, access_Token: access_Token };
      }
    } catch (err) {
      console.log(err);
    }
  }
  ////////////////////////////////////////////////End SingIn/////////////////////////////////////////////
  ////////////////////////////////////////////////Start updateUser///////////////////////////////////////
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => Int)
    id: number,
    @Arg("data", () => dataUpdate)
    data: dataUpdate
  ): Promise<User | any> {
    const updateUser = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!updateUser) {
      return null;
    }
    try {
      updateUser.email = data?.email;
      updateUser.password = await bcrypt.hash(data?.password, 12);
      updateUser.username = data?.username;
      User.save(updateUser);
      return updateUser;
    } catch (err) {
      console.log(err);
    }
  }
  ////////////////////////////////////////////////End updateUser///////////////////////////////////////
}
