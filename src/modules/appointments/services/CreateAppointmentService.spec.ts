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
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      providerId: '1234567890',
    })

    expect(appointment).toHaveProperty('id')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11)

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: '1234567890',
    })

    await expect(createAppointmentService.execute({
      date: appointmentDate,
      providerId: '3124546',
    })).rejects.toBeInstanceOf(AppError)
  })
})
