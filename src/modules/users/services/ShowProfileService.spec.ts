import 'reflect-metadata'

import ShowProfileService from './ShowProfileService'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let showProfileService: ShowProfileService
let fakeUserRepository: FakeUserRepository

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    showProfileService = new ShowProfileService(
      fakeUserRepository,
    )
  })

  it('should be able to show user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    const profile = await showProfileService.execute({
      userId: user.id,
    })

    expect(profile.name).toEqual('Leonardo')
    expect(profile.email).toEqual('leonardo@gmail.com')

  })

  it('should not be able to show user profile from non-existing user', async () => {
    await expect(showProfileService.execute({
      userId: 'non-existing-user-id',
    })).rejects.toBeInstanceOf(AppError)
  })
})
