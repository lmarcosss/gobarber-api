import 'reflect-metadata'

import UpdateProfileService from './UpdateProfileService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let updateProfileService: UpdateProfileService
let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
      )
  })

  it('should be able to update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    await updateProfileService.execute({
      userId: user.id,
      name: 'Leonardo Marcos',
      email: 'leonardo1@gmail.com'
    })

    expect(user.name).toEqual('Leonardo Marcos')
    expect(user.email).toEqual('leonardo1@gmail.com')

  })

  it('should not be able to change to another user email', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    await fakeUserRepository.create({
      name: 'Jenny',
      email: 'jenny@gmail.com',
      password: '123456789',
    })

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'Leonardo Marcos',
        email: 'jenny@gmail.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update user non-existing', async () => {
    await expect(
      updateProfileService.execute({
        userId: '13235667',
        name: 'Leonardo Marcos',
        email: 'jenny@gmail.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'Leonardo Marcos',
      email: 'leonardo1@gmail.com',
      oldPassword: '123456789',
      password: '123123'
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('should not be able to update the password without oldPassword', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })


    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'Leonardo Marcos',
        email: 'leonardo@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password when oldPassword is wrong', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })


    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'Leonardo Marcos',
        email: 'leonardo@gmail.com',
        password: '123123',
        oldPassword: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
