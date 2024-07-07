import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import { mongoConnection } from '../infrastructure/mongo'
import { User } from '../models/user'

class UserRepository {
  private readonly collection = 'users'

  async findById (id: string): Promise<User | null> {
    const db = await mongoConnection.getDb()
    return await db.collection<User>(this.collection).findOne({ _id: new ObjectId(id) })
  }

  async findByEmail (email: string): Promise<User | null> {
    const db = await mongoConnection.getDb()
    return await db.collection<User>(this.collection).findOne({ email })
  }

  async create (user: User): Promise<User> {
    const db = await mongoConnection.getDb()
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = { ...user, password: hashedPassword }
    const result = await db.collection<User>(this.collection).insertOne(newUser)
    return { ...newUser, id: result.insertedId.toString() }
  }
}

export default UserRepository
