import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
  findById(id: String): Promise<User | undefined>
  findByEmail(email: String): Promise<User | undefined>
  create(userData: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
