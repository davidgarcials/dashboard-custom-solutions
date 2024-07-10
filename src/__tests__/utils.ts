import { Db, ObjectId } from "mongodb";
import { SolutionDTO } from "../models/DTOS/solutionDTO";
import { Screen } from "../models/screen";

const collection = process.env.MONGO_SOLUTIONS_COLLECTION ?? "solutions";

export const createSolution = async (db: Db): Promise<string> => {
  const newSolution: SolutionDTO = {
    name: "Solution name",
    owner: "test@example.com",
    screens: [],
    createdAt: new Date(),
  };

  const { insertedId } = await db.collection(collection).insertOne(newSolution);

  return insertedId.toString();
};

export const createScreen = async (
  db: Db,
  solutionId: string,
): Promise<string> => {
  const newScreen: Screen = {
    id: new ObjectId().toString(),
    name: "Solution name",
    widgets: [],
  };

  await db
    .collection<SolutionDTO>(collection)
    .updateOne(
      { _id: new ObjectId(solutionId) },
      { $push: { screens: newScreen } },
    );

  return newScreen.id;
};

export const createWidget = () => ({
  position: {
    x: 2,
    y: 2,
  },
  type: "bar",
  settings: {
    dataSource: "datasource",
    xAxis: "axisx",
    yAxis: "asixy",
  },
  size: {
    height: 200,
    width: 200,
  },
});
