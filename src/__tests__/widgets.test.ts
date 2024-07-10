import express, { Application } from "express";
import { Db } from "mongodb";
import request from "supertest";
import { mongoConnection } from "../infrastructure/mongo";
import { Widget } from "../models/widgets";
import widgetsRoute from "../routes/widgets";
import { createScreen, createSolution, createWidget } from "./utils";

jest.mock("../infrastructure/mongo");

const collection = process.env.MONGO_SOLUTIONS_COLLECTION ?? "solutions";

describe("Integration widgets tests", () => {
  let app: Application;
  let db: Db;

  beforeAll(async () => {
    await mongoConnection.initClient();
    db = await mongoConnection.getDb();
    app = express();
    app.use(express.json());
    app.use("/widgets", widgetsRoute);
  });

  afterAll(async () => {
    await db.collection(collection).deleteMany();
    await mongoConnection.closeClient();
  });

  it("Should create a widget", async () => {
    const solutionId = await createSolution(db);
    const screenId = await createScreen(db, solutionId);
    const widgetData = await createWidget();

    const res = await request(app).post("/widgets/create").send({
      solutionId,
      screenId,
      widgetData,
    });

    expect(res.status).toBe(200);
    expect(res.body.id).not.toBeUndefined();

    await db.collection(collection).deleteOne({ _id: new Object(solutionId) });
  });

  it("Should modify a widget", async () => {
    const solutionId = await createSolution(db);
    const screenId = await createScreen(db, solutionId);
    const widgetData = await createWidget();

    const resultCreate = await request(app).post("/widgets/create").send({
      solutionId,
      screenId,
      widgetData,
    });

    const newWidgetId = JSON.parse(resultCreate.text).id;

    expect(resultCreate.status).toBe(200);

    const newWidgetData: Widget = {
      ...widgetData,
      id: newWidgetId,
      type: "images",
    };

    const resultModify = await request(app).post("/widgets/modify").send({
      solutionId,
      screenId,
      widgetData: newWidgetData,
    });

    expect(resultModify.status).toBe(200);
    expect(resultModify.text).toBe("Widget modified");

    await db.collection(collection).deleteOne({ _id: new Object(solutionId) });
  });

  it("Should delete a widget", async () => {
    const solutionId = await createSolution(db);
    const screenId = await createScreen(db, solutionId);
    const widgetData = await createWidget();

    const resultCreate = await request(app).post("/widgets/create").send({
      solutionId,
      screenId,
      widgetData,
    });

    const newWidgetId = JSON.parse(resultCreate.text).id;

    const resultModify = await request(app).post("/widgets/delete").send({
      solutionId,
      screenId,
      widgetId: newWidgetId,
    });

    expect(resultModify.status).toBe(200);
    expect(resultModify.text).toBe("Widget deleted");

    await db.collection(collection).deleteOne({ _id: new Object(solutionId) });
  });
});
