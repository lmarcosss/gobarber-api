import { uuid } from 'uuidv4'

import UserToken from '@modules/users/infra/typeorm/entities/UserToken'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

class FakeUserTokenRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate (userId: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, { id: uuid(), token: uuid(), userId })

    this.userTokens.push(userToken)

    return userToken
  }


}

export default FakeUserTokenRepository
