import express, { Application } from "express";
import { Db } from "mongodb";
import request from "supertest";
import { mongoConnection } from "../infrastructure/mongo";
import { Screen } from "../models/screen";
import screenRouter from "../routes/screens";
import { createSolution } from "./utils";

jest.mock("../infrastructure/mongo");

const collection = process.env.MONGO_SOLUTIONS_COLLECTION ?? "solutions";

describe("Integration screens tests", () => {
  let app: Application;
  let db: Db;

  beforeAll(async () => {
    await mongoConnection.initClient();
    db = await mongoConnection.getDb();
    app = express();
    app.use(express.json());
    app.use("/screens", screenRouter);
  });

  afterAll(async () => {
    await db.collection(collection).deleteMany();
    await mongoConnection.closeClient();
  });

  it("Should create a screen", async () => {
    const solutionId = await createSolution(db);

    const res = await request(app).post("/screens/create").send({
      solutionId,
      name: "screen 1",
    });

    expect(res.status).toBe(200);
    expect(res.body.id).not.toBeUndefined();

    await db.collection(collection).deleteOne({ _id: new Object(solutionId) });
  });

  it("Should modify a screen", async () => {
    const solutionId = await createSolution(db);

    const resultCreate = await request(app).post("/screens/create").send({
      solutionId,
      name: "screen 1",
    });

    const newScreenId = JSON.parse(resultCreate.text).id;

    const newScreen: Screen = {
      id: newScreenId,
      name: "new name",
    };

    const resultModify = await request(app).post("/screens/modify").send({
      solutionId,
      screen: newScreen,
    });

    expect(resultModify.status).toBe(200);
    expect(resultModify.text).toBe("Screen modified");

    await db.collection(collection).deleteOne({ _id: new Object(solutionId) });
  });

  it("Should delete a screen", async () => {
    const solutionId = await createSolution(db);

    const resultCreate = await request(app).post("/screens/create").send({
      solutionId,
      name: "screen 1",
    });

    const newScreenId = JSON.parse(resultCreate.text).id;

    const resultModify = await request(app).post("/screens/delete").send({
      solutionId,
      screenId: newScreenId,
    });

    expect(resultModify.status).toBe(200);
    expect(resultModify.text).toBe("Screen deleted");

    await db.collection(collection).deleteOne({ _id: new Object(solutionId) });
  });
});
