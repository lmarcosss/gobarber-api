import 'reflect-metadata'

import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    )

    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toEqual('avatar.jpg')
  })

  it('should not be able to update avatar from no existing user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    )

    await expect(updateUserAvatar.execute({
      userId: '123456789',
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    )

    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',

    })

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar2.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toEqual('avatar2.jpg')
  })
})
