import { DeleteResult, ObjectId, UpdateResult } from "mongodb";
import { getEnvVar } from "../infrastructure/config";
import { mongoConnection } from "../infrastructure/mongo";
import { SolutionDTO } from "../models/DTOS/solutionDTO";
import { Solution } from "../models/solution";

class SolutionsRepository {
  private readonly collection = getEnvVar("MONGO_SOLUTIONS_COLLECTION");

  async findById(id: string): Promise<Solution | null> {
    const db = await mongoConnection.getDb();
    const result = await db
      .collection<SolutionDTO>(this.collection)
      .findOne({ _id: new ObjectId(id) });

    if (result) {
      const { _id, ...solution } = result;

      return { id: _id.toString(), ...solution };
    }

    return result;
  }

  async findOneByEmailAndName(
    owner: string,
    name: string,
  ): Promise<Solution | null> {
    const db = await mongoConnection.getDb();
    const result = await db
      .collection<SolutionDTO>(this.collection)
      .findOne({ owner, name });

    if (result) {
      const { _id, ...solution } = result;

      return { id: _id.toString(), ...solution };
    }

    return result;
  }

  async createSolution(owner: string, name: string): Promise<string> {
    const newSolution: SolutionDTO = {
      name,
      owner,
      screens: [],
      createdAt: new Date(),
    };

    const db = await mongoConnection.getDb();
    const result = await db
      .collection<SolutionDTO>(this.collection)
      .insertOne(newSolution);
    return result.insertedId.toString();
  }

  async modifySolution(
    id: string,
    owner: string,
    name: string,
  ): Promise<UpdateResult<SolutionDTO>> {
    const db = await mongoConnection.getDb();
    return db
      .collection<SolutionDTO>(this.collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: { owner, name } });
  }

  async deleteSolution(id: string): Promise<DeleteResult> {
    const db = await mongoConnection.getDb();
    return db
      .collection<SolutionDTO>(this.collection)
      .deleteOne({ _id: new ObjectId(id) });
  }
}

export default SolutionsRepository;
