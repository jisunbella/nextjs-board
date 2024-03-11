import { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>
  }

  // namespace Express {
  //   interface Response {
  //     yourCustomResponse: yourType
  //   }
  // }
};