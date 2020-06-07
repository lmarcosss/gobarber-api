import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  userId: string
}

@injectable()
class ListProvidersService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute ({ userId }: IRequest): Promise<User[]> {
    const key = `providers-list:${userId}`

    let users = await this.cacheProvider.recover<User[]>(key)

    if (!users) { 
      users = await this.usersRepository.findAllProviders({
        exceptUserId: userId,
      })

      await this.cacheProvider.save(key, users)
    }
    
    return users
  }
}

export default ListProvidersService
