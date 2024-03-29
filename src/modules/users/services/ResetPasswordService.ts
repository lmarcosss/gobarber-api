import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
/**
 * [x] Recebimento de informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

 interface IRequest {
   password: string
   token: string
 }

@injectable()
class ResetPasswordService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute ({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token doesn`t exists')
    }

    const tokenCreatedAt = userToken.createdAt
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    const user = await this.usersRepository.findById(userToken.userId)

    if (!user) {
      throw new AppError('User doesn`t exists')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService
