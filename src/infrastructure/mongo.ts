import { Db, MongoClient } from "mongodb";
import { getEnvVar } from "./config";

let mongoClient: MongoClient;

const initClient = async (): Promise<void> => {
  console.log("Connecting to Mongo...");

  try {
    mongoClient = await MongoClient.connect(getEnvVar("MONGO_URI"));
  } catch (e: any) {
    throw new Error(e);
  }
};

const closeClient = async (): Promise<void> => {
  if (!mongoClient) {
    return;
  }

  await mongoClient.close();
};

const getDb = async (): Promise<Db> => {
  if (!mongoClient) {
    await initClient();
  }

  return mongoClient.db(getEnvVar("MONGO_DATABASE_NAME"));
};

export const mongoConnection = {
  initClient,
  closeClient,
  getDb,
};
