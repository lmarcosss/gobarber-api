import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

export default interface IUsersRepository {
  findById(id: String): Promise<User | undefined>
  findByEmail(email: String): Promise<User | undefined>
  create(userData: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
