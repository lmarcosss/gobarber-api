import { startOfHour } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import AppError from '@shared/errors/AppError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
/**
 * [x] Recebimento de informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

injectable()
class CreateAppointmentService {
  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository : IAppointmentsRepository,
  ) {}

  public async execute ({ date, providerId }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.')
    }

    const appointment = this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
