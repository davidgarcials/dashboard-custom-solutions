import request from "supertest";
import express, { Application } from "express";
import { Db, ObjectId } from "mongodb";
import { mongoConnection } from "../infrastructure/mongo";
import solutionRouter from "../routes/solution";
import { SolutionDTO } from "../models/DTOS/solutionDTO";

jest.mock("../infrastructure/mongo");

const collection = process.env.MONGO_SOLUTIONS_COLLECTION ?? "solutions";

describe("Integration solution tests", () => {
  let app: Application;
  let db: Db;

  beforeAll(async () => {
    await mongoConnection.initClient();
    db = await mongoConnection.getDb();
    app = express();
    app.use(express.json());
    app.use("/solutions", solutionRouter);
  });

  afterAll(async () => {
    await db.collection(collection).deleteMany();
    await mongoConnection.closeClient();
  });

  it("Should create a solution", async () => {
    const email = "test@example.com";
    const name = "Solution name";
    const res = await request(app).post("/solutions/create").send({
      email,
      name,
    });

    const result = await db
      .collection(collection)
      .findOne({ owner: email, name });

    expect(res.status).toBe(200);
    expect(res.body.id).not.toBeUndefined();
    expect(result).not.toBeNull();

    await db.collection(collection).deleteMany({ owner: email, name });
  });

  it("Should give a validation param error on create solution", async () => {
    const email = "test@example.com";

    const res = await request(app).post("/solutions/create").send({
      email,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('"name" is required');
  });

  it("Should modify a solution", async () => {
    const email = "test@example.com";
    const newEmail = "new@example.com";
    const name = "Solution name";

    const { insertedId } = await db
      .collection(collection)
      .insertOne({ owner: email, name });

    const res = await request(app).post("/solutions/modify").send({
      id: insertedId.toString(),
      email: newEmail,
      name,
    });

    const newSolution = await db
      .collection<SolutionDTO>(collection)
      .findOne({ _id: insertedId });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Solution modified");
    expect(newSolution?.owner).toBe(newEmail);

    await db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(insertedId) });
  });

  it("Should delete a solution", async () => {
    const email = "test@example.com";
    const name = "Solution name";

    const { insertedId } = await db
      .collection(collection)
      .insertOne({ owner: email, name });

    const res = await request(app).post("/solutions/delete").send({
      id: insertedId.toString(),
    });

    const findSolution = await db
      .collection<SolutionDTO>(collection)
      .findOne({ _id: insertedId });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Solution deleted");
    expect(findSolution).toBeNull();
  });

  it("Should get a solution", async () => {
    const email = "test@example.com";
    const name = "Solution name";

    const { insertedId } = await db
      .collection(collection)
      .insertOne({ owner: email, name });

    const expectedSolution = {
      name,
      id: insertedId.toString(),
      owner: email,
    };

    const res = await request(app).get(`/solutions/${expectedSolution.id}`);

    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toStrictEqual(expectedSolution);
  });
});
