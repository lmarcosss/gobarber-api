import 'reflect-metadata'

import CreateUserService from './CreateUserService'
import AuthenticateUserService from './AuthenticateUserService'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
  it('should be able to authenticated', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const email = 'leonardo@gmail.com'
    const password = '123456789'

    const user = await createUserService.execute({
      name: 'Leonardo Marcos',
      email,
      password,
    })

    const session = await authenticateUserService.execute({ email, password })

    expect(session).toHaveProperty('token')
    expect(session.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const email = 'leonardo@gmail.com'
    const password = '123456789'

    await expect(authenticateUserService.execute({
      email,
      password,
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new session with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const email = 'leonardo@gmail.com'
    const password = '123456789'
    const otherPassword = '42rf43f4'

    await createUserService.execute({
      name: 'Leonardo Marcos',
      email,
      password,
    })

    await expect(authenticateUserService.execute({
      email,
      password: otherPassword,
    })).rejects.toBeInstanceOf(AppError)
  })
})
