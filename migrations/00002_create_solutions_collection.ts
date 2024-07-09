import { MigrationInterface } from "mongo-migrate-ts";
import { Db } from "mongodb";
import { getEnvVar } from "../src/infrastructure/config";

const solutionsCollection = getEnvVar("MONGO_SOLUTIONS_COLLECTION");

export class CreateSolutionsCollection implements MigrationInterface {
  async up(db: Db): Promise<any> {
    await db.createCollection(solutionsCollection);
    await db.createIndex(solutionsCollection, { owner: 1, name: 1 });
  }

  async down(db: Db): Promise<any> {
    await db.dropCollection(solutionsCollection);
  }
}
