import { ObjectId } from "mongodb";
import { getEnvVar } from "../infrastructure/config";
import { mongoConnection } from "../infrastructure/mongo";
import { SolutionDTO } from "../models/DTOS/solutionDTO";
import { Screen } from "../models/screen";
import { Solution } from "../models/solution";
import { Widget } from "../models/widgets";

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

  async modifySolution(id: string, owner: string, name: string) {
    const db = await mongoConnection.getDb();
    return db
      .collection<SolutionDTO>(this.collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: { owner, name } });
  }

  async deleteSolution(id: string) {
    const db = await mongoConnection.getDb();
    return db
      .collection<SolutionDTO>(this.collection)
      .deleteOne({ _id: new ObjectId(id) });
  }

  async createScreen(solutionId: string, name: string): Promise<string> {
    const id = new ObjectId().toString();
    const newScreen: Screen = {
      name,
      id,
      widgets: [],
    };

    const db = await mongoConnection.getDb();
    await db
      .collection<SolutionDTO>(this.collection)
      .updateOne(
        { _id: new ObjectId(solutionId) },
        { $push: { screens: newScreen } },
      );

    return id;
  }

  async updateScreen(solutionId: string, screen: Screen) {
    const db = await mongoConnection.getDb();
    return db.collection<SolutionDTO>(this.collection).updateOne(
      {
        _id: new ObjectId(solutionId),
        "screens.id": screen.id,
      },
      { $set: { "screens.$": screen } },
    );
  }

  async deleteScreen(solutionId: string, screenId: string) {
    const db = await mongoConnection.getDb();
    return db.collection<SolutionDTO>(this.collection).updateOne(
      {
        _id: new ObjectId(solutionId),
      },
      { $pull: { screens: { id: screenId } } },
    );
  }

  async createWidget(
    solutionId: string,
    screenId: string,
    widgetData: Omit<Widget, "id">,
  ): Promise<string> {
    const id = new ObjectId().toString();
    const newWidget = { ...widgetData, id };
    const db = await mongoConnection.getDb();
    await db
      .collection<SolutionDTO>(this.collection)
      .updateOne(
        { _id: new ObjectId(solutionId), "screens.id": screenId },
        { $push: { "screens.$.widgets": newWidget } },
      );

    return id;
  }

  async updateWidget(solutionId: string, screenId: string, widgetData: Widget) {
    const db = await mongoConnection.getDb();
    return db.collection<SolutionDTO>(this.collection).updateOne(
      {
        _id: new ObjectId(solutionId),
        "screens.id": screenId,
        "screens.widgets.id": widgetData.id,
      },
      { $set: { "screens.$.widgets.$[wid]": widgetData } },
      { arrayFilters: [{ "wid.id": widgetData.id }] },
    );
  }

  async deleteWidget(solutionId: string, screenId: string, widgetId: string) {
    const db = await mongoConnection.getDb();
    return db.collection<SolutionDTO>(this.collection).updateOne(
      {
        _id: new ObjectId(solutionId),
        "screens.id": screenId,
      },
      { $pull: { "screens.$.widgets": { id: widgetId } } },
    );
  }
}

export default SolutionsRepository;
