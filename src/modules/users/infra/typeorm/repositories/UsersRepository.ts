import { Repository, getRepository, Not } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor () {
    this.ormRepository = getRepository(User)
  }

  public async findById (id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    })

    return user
  }

  public async findAllProviders({ exceptUserId }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[]
    
    if (exceptUserId) {
      users = await this.ormRepository.find({
        where: {
          id: Not(exceptUserId)
        }
      })
    } else {
      users = await this.ormRepository.find()
    }

    return users
  }


  public async create (userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async save (data: User): Promise<User> {
    const user = await this.ormRepository.save(data)

    return user
  }
}

export default UsersRepository
