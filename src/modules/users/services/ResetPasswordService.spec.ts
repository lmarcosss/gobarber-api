import 'reflect-metadata'

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPasswordService: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
      )
  })

  it('should be able to reset password', async () => {

    const user = await fakeUserRepository.create({
      name: 'Leonardo Marcos',
      email: 'leonardo@gmail.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    
    await resetPasswordService.execute({
      password: '123123', 
      token,
    })

    const updatedUser = await fakeUserRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('123123')
    expect(updatedUser?.password).toBe('123123')
  })

  it('should not be able to reset password because token doesn`t exists', async () => {
    await expect(resetPasswordService.execute({
      password: '123123', 
      token: '4f4h8f4y387',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password because user doesn`t exists', async () => {
    const { token } = await fakeUserTokensRepository.generate('131242534')

    await expect(resetPasswordService.execute({
      password: '123123', 
      token,
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password if passed more than two hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'Leonardo Marcos',
      email: 'leonardo@gmail.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(resetPasswordService.execute({
      password: '123123', 
      token,
    })).rejects.toBeInstanceOf(AppError)
  })

})
