import 'reflect-metadata'

import ListProviderMonthAvailabilityService from '../services/ListProviderMonthAvailabilityService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderMothAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list month availability from provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 19, 11).getTime()
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId: 'provider',
      month: 5,
      year: 2020,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false},
        { day: 21, available: true},
      ])
    )
  })
})
