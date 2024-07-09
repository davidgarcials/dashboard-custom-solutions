import { DeleteResult, ObjectId } from "mongodb";
import { getEnvVar } from "../infrastructure/config";
import { mongoConnection } from "../infrastructure/mongo";
import { SolutionDTO } from "../models/DTOS/solutionDTO";
import { Solution } from "../models/solution";

class SolutionsRepository {
  private readonly collection = getEnvVar("MONGO_SOLUTIONS_COLLECTION");

  async findSolution(email: string, name: string): Promise<Solution | null> {
    const db = await mongoConnection.getDb();
    const result = await db
      .collection<SolutionDTO>(this.collection)
      .findOne({ owner: email, name });

    if (result) {
      const { _id, ...solution } = result;

      return { id: _id.toString(), ...solution };
    }

    return result;
  }

  async createSolution(email: string, name: string): Promise<void> {
    const newSolution: SolutionDTO = {
      name,
      owner: email,
      screens: [],
      createdAt: new Date(),
    };

    const db = await mongoConnection.getDb();
    await db.collection<SolutionDTO>(this.collection).insertOne(newSolution);
  }

  async deleteSolution(id: string): Promise<DeleteResult> {
    const db = await mongoConnection.getDb();
    return db.collection(this.collection).deleteOne({ _id: new ObjectId(id) });
  }
}

export default SolutionsRepository;
