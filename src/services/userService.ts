import UserRepository from '../repositories/userRepository'
import { User } from '../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getEnvVar } from '../infrastructure/config'

class UserService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id)
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.create(user)
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email)
    if ((user != null) && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, getEnvVar('JWT_SECRET'), {
        expiresIn: '1h'
      })
      return token
    }
    return null
  }
}

export default UserService
