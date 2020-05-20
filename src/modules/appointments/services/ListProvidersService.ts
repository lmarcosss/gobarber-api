import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  userId: string
}

@injectable()
class ListProvidersService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute ({ userId }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      exceptUserId: userId,
    })
    
    return users
  }
}

export default ListProvidersService
