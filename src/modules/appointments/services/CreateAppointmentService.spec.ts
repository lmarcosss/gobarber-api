import 'reflect-metadata'

import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'

import AppError from '@shared/errors/AppError'

let fakeAppointmentRepository: FakeAppointmentRepository
let createAppointmentService: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      providerId: '1234567890',
      userId: '1234567',
    })

    expect(appointment).toHaveProperty('id')
  })

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointmentDate = new Date(2020, 4, 10, 12)

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: '1234567890',
      userId: '1234567',
    })

    await expect(createAppointmentService.execute({
      date: appointmentDate,
      providerId: '3124546',
      userId: '1234567',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })


    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 11),
      providerId: '3124546',
      userId: '1234567',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not able to create an appointments wiwh same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })


    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      providerId: '1234567',
      userId: '1234567',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not able to create an appointment before  8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 7),
      providerId: '1234567890',
      userId: '1234567',
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 18),
      providerId: '1234567',
      userId: '1234567890',
    })).rejects.toBeInstanceOf(AppError)
  })
})
