import express from "express";
import authMiddleware from "./middleware/authMiddleware";
import { mongoConnection } from "./infrastructure/mongo";
import solutionRouter from "./routes/solution";
import screenRouter from "./routes/screens";
import userRouter from "./routes/user";
import widgetRouter from "./routes/widgets";

const app = express();

// Middleware
app.use(express.json());

mongoConnection
  .initClient()
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((e) => {
    console.log("Error connecting to Mongo ", e);
  });

app.use("/users", userRouter);
app.use("/solutions", authMiddleware, solutionRouter);
app.use("/screens", authMiddleware, screenRouter);
app.use("/widgets", authMiddleware, widgetRouter);

export default app;
