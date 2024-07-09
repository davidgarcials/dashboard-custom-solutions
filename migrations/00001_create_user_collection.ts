import { MigrationInterface } from "mongo-migrate-ts";
import { Db } from "mongodb";
import { getEnvVar } from "../src/infrastructure/config";

const userCollection = getEnvVar("MONGO_USERS_COLLECTION");

export class CreateUserCollection implements MigrationInterface {
  async up(db: Db): Promise<any> {
    await db.createCollection(userCollection);
    await db.createIndex(userCollection, { email: 1 }, { unique: true });
  }

  async down(db: Db): Promise<any> {
    await db.dropCollection(userCollection);
  }
}
