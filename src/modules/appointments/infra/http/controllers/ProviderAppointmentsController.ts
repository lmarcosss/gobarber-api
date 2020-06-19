import { Response, Request } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointmentsService from '../../../services/ListProviderAppointmentsService'
import { classToClass } from 'class-transformer'

export default class ProviderAppointmentsController {
  public async index (request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id
    const { day, month, year } = request.query
    
    const createAppointment = container.resolve(ListProviderAppointmentsService)

    const appointments = await createAppointment.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(classToClass(appointments))
  }
}
