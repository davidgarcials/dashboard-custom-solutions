import { mongoMigrateCli } from "mongo-migrate-ts";

mongoMigrateCli({
  useEnv: true,
  migrationsCollection: "migrations_collection",
  migrationsDir: __dirname,
  environment: {
    uriVar: "MONGO_URI",
    databaseVar: "MONGO_DATABASE_NAME",
  },
});
