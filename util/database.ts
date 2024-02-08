import { MongoClient } from "mongodb";

const id: string = "admin"
const password: string = "qwer1234";

const url = `mongodb+srv://${id}:${password}@cluster0.k5mjgtw.mongodb.net/?retryWrites=true&w=majority`;
const options: any = { useNewUrlParser: true }
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}

export { connectDB };