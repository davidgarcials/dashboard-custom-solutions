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

  async createUser(user: User): Promise<void> {
    if (!user.email || !user.password) {
      throw new Error('You must provide email and password')
    }

    const exists = await this.userRepository.findByEmail(user.email)

    if (exists) {
      throw new Error("There is already a user with this email")
    }

    await this.userRepository.create(user)
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email)
    if ((user != null) && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, getEnvVar('JWT_SECRET'), {
        expiresIn: '7 days'
      })
      return token
    }
    return null
  }
}

export default UserService
