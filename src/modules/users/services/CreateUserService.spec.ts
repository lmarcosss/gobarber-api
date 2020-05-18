import 'reflect-metadata'

import CreateUserService from './CreateUserService'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

let createUserService: CreateUserService
let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )
  })
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Leonardo Marcos',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'Leonardo Marcos',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    await expect(createUserService.execute({
      name: 'Leonardo de Oliveira',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })).rejects.toBeInstanceOf(AppError)
  })
})
