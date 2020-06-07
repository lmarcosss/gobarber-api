import 'reflect-metadata'

import ListProviderAppointmentsService from '../services/ListProviderAppointmentsService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let listProviderAppointmentsService: ListProviderAppointmentsService
let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeCacheProvider: FakeCacheProvider

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to list the provider appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 21, 14, 0, 0),
    })

    const appointment2 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 21, 15, 0, 0),
    })

    const appointments = await listProviderAppointmentsService.execute({
      providerId: 'provider',
      day: 21,
      month: 5,
      year: 2020,
    })

    expect(appointments).toEqual(
      [
        appointment1,
        appointment2,
      ]
    )
  })
})
