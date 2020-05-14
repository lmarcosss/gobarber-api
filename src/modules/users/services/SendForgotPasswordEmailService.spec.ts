import 'reflect-metadata'

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPasswordEmailService: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
      )
  })

  it('should be able to recover the password using the email', async () => {
    const sendMail = spyOn(fakeMailProvider, 'sendMail')

    await fakeUserRepository.create({
      name: 'Leonardo Marcos',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    
    await sendForgotPasswordEmailService.execute({ email: 'leonardo@gmail.com' })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able recover a non-existing user mail', async () => {
    await expect(sendForgotPasswordEmailService.execute({
      email: 'leonardo@gmail.com',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const generateToken = spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUserRepository.create({
      name: 'Leonardo Marcos',
      email: 'leonardo@gmail.com',
      password: '123456789',
    })

    
    await sendForgotPasswordEmailService.execute({ email: 'leonardo@gmail.com' })

    expect(generateToken).toHaveBeenCalledWith(user.id)

  })

})
