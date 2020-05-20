import { uuid } from 'uuidv4'

import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

class UsersRepository implements IUserRepository {
  private users: User[] = []

  public async findById (id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id)

    return findUser
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email)

    return findUser
  }

  public async findAllProviders({ exceptUserId }: IFindAllProvidersDTO): Promise<User[]> {
    if (exceptUserId) {
      return this.users.filter((user) => user.id !== exceptUserId)
    }
    return this.users
  }


  public async create (userData: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid() }, userData)

    this.users.push(user)

    return user
  }

  public async save (user: User): Promise<User> {
    const userIndex = this.users.findIndex((findUser) => findUser.id === user.id)

    this.users[userIndex] = user

    return user
  }
}

export default UsersRepository
