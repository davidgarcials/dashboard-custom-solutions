import bcrypt from "bcryptjs";
import { getEnvVar } from "../infrastructure/config";
import { mongoConnection } from "../infrastructure/mongo";
import { UserDTO } from "../models/DTOS/userDTO";
import { User } from "../models/user";

class UserRepository {
  private readonly collection = getEnvVar("MONGO_USERS_COLLECTION");

  async findByEmail(email: string): Promise<User | null> {
    const db = await mongoConnection.getDb();
    return await db.collection<User>(this.collection).findOne({ email });
  }

  async create(user: User): Promise<void> {
    const db = await mongoConnection.getDb();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      ...user,
      password: hashedPassword,
      createdAt: new Date(),
    };
    await db.collection<UserDTO>(this.collection).insertOne(newUser);
  }
}

export default UserRepository;
