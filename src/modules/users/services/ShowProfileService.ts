import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  userId: string
}

@injectable()
class ShowProfileService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute ({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId)
    
    if (!user) {
      throw new AppError('User not found')
    }

    return user

  }
}

export default ShowProfileService
