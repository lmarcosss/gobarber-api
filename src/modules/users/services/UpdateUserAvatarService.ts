import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  userId: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute ({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }
    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename

    delete user.password

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService