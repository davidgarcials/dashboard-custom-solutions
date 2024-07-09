import request from "supertest";
import express, { Application } from "express";
import userRoutes from "../routes/user";
import { mongoConnection } from "../infrastructure/mongo";
import { Db } from "mongodb";

jest.mock("../infrastructure/mongo");

const collection = process.env.MONGO_USERS_COLLECTION ?? "users";

describe("Integration users tests", () => {
  let app: Application;
  let db: Db;

  beforeAll(async () => {
    await mongoConnection.initClient();
    db = await mongoConnection.getDb();
    app = express();
    app.use(express.json());
    app.use("/users", userRoutes);
  });

  afterAll(async () => {
    await db.collection(collection).deleteMany();
    await mongoConnection.closeClient();
  });

  it("Should create a new user", async () => {
    const email = "test@example.com";
    const res = await request(app).post("/users/create").send({
      email,
      password: "password123",
    });

    const result = await db.collection(collection).findOne({ email });

    expect(res.status).toBe(200);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.email).toBe(email);
    }

    await db.collection(collection).deleteMany({ email });
  });

  it("Should throw email exists error", async () => {
    const email = "test@example.com";

    await db.collection(collection).insertOne({ email });

    const res = await request(app).post("/users/create").send({
      email,
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already exists");

    await db.collection(collection).deleteMany({ email });
  });

  it("Should throw missing email error", async () => {
    const res = await request(app).post("/users/create").send({
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("You must provide email and password");
  });

  it("Should login", async () => {
    const email = "test@example.com";
    const password = "password123";

    await request(app).post("/users/create").send({
      email,
      password,
    });

    const res = await request(app).post("/users/login").send({
      email,
      password,
    });

    expect(res.body).toHaveProperty("token");

    await db.collection(collection).deleteMany({ email });
  });

  it("Should login wrong params error", async () => {
    const email = "test@example.com";
    const wrongEmail = "wrong@example.com";
    const password = "password123";

    await request(app).post("/users/create").send({
      email,
      password,
    });

    const res = await request(app).post("/users/login").send({
      email: wrongEmail,
      password,
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");

    await db.collection(collection).deleteMany({ email });
  });
});
