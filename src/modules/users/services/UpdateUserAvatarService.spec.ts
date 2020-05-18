import 'reflect-metadata'

import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let updateUserAvatarService: UpdateUserAvatarService
let fakeUserRepository: FakeUserRepository
let fakeStorageProvider: FakeStorageProvider

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeStorageProvider = new FakeStorageProvider()
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
      )
  })

  it('should be able to update user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toEqual('avatar.jpg')
  })

  it('should not be able to update avatar from no existing user', async () => {
    await expect(updateUserAvatarService.execute({
      userId: '123456789',
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',

    })

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar2.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toEqual('avatar2.jpg')
  })
})
