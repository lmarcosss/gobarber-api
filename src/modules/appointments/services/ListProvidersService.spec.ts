import 'reflect-metadata'

import ListProvidersService from '../services/ListProvidersService'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

let listProvidersService: ListProvidersService
let fakeUserRepository: FakeUserRepository

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    listProvidersService = new ListProvidersService(
      fakeUserRepository,
    )
  })

  it('should be able to list the providers', async () => {
    const loggedUser = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456789',
    })

    const user2 = await fakeUserRepository.create({
      name: 'Fulano de Tal',
      email: 'fulano@gmail.com',
      password: '123456789',
    })

    const providers = await listProvidersService.execute({
      userId: loggedUser.id,
    })

    expect(providers).toEqual([user1, user2])
  })
})
