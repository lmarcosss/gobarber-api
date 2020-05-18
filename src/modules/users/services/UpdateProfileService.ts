import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface IRequest {
  userId: string
  name: string
  email: string
  oldPassword?: string
  password?: string
}

@injectable()
class UpdateProfileService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute ({ userId, name, email, password, oldPassword }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId)
    
    if (!user) {
      throw new AppError('User not found')
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email)

    if (userWithUpdateEmail && userWithUpdateEmail.id !== userId) {
      throw new AppError('E-mail already in use')
    }

    user.name = name
    user.email = email

    if (password && !oldPassword) {
      throw new AppError('You need to informe the old password to set a new password')
    }

    if (password && oldPassword) {      
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      )

      if (!checkOldPassword){
        throw new AppError('Password doesn`t match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.save(user)

  }
}

export default UpdateProfileService
