import { uuid } from 'uuidv4'

import UserToken from '@modules/users/infra/typeorm/entities/UserToken'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

class FakeUserTokenRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate (userId: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find((findToken) => findToken.token === token)

    return userToken
  }


}

export default FakeUserTokenRepository
