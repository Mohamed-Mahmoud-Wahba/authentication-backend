import {
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Message } from "../entities/Message";
const channel = "CHAT_CHANNEL";
@Resolver()
export class Messages {
  @Query(() => String)
  message(): string {
    return "Hello World!";
  }
  @Query(() => [Message])
  async GetAllMessages() {
    try {
      const messages = await Message.find({
        where: {
          author: 1,
          recever: 2,
        },
        order: {
          created: "DESC",
        },
      });
      return messages;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => Message, { nullable: true })
  async createMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg("message", () => String)
    message: string
  ): Promise<Message | any> {
    const msg = await Message.create({
      message: message,
      author: 1,
      recever: 2,
    });
    const ms = await msg.save();
    await pubSub.publish(channel, ms);
    return msg;
  }
  @Subscription({ topics: channel })
  messageSent(@Root() msg: Message): Message {
    return msg;
  }
}
