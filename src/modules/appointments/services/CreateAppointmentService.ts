import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import AppError from '@shared/errors/AppError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

/**
 * [x] Recebimento de informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

 interface IRequest {
   date: Date
   providerId: string
   userId: string
 }

@injectable()
class CreateAppointmentService {
  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository : IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository : INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute ({ date, providerId, userId }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.")
    }

    if (providerId === userId) {
      throw new AppError("You can't create an appointment with yourself.")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointments between 8am and 5pm.')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      providerId
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.')
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate,
    })

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm")

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para dia ${dateFormatted}`
    })

    await this.cacheProvider.invalidate(`provider-appointments:${providerId}:${format(appointmentDate, 'yyyy-M-d')}`)

    return appointment
  }
}

export default CreateAppointmentService
