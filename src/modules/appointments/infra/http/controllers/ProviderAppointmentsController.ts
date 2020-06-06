import { Response, Request } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointmentsService from '../../../services/ListProviderAppointmentsService'

export default class ProviderAppointmentsController {
  public async index (request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id
    const { day, month, year } = request.body
    
    const createAppointment = container.resolve(ListProviderAppointmentsService)


    const appointments = await createAppointment.execute({
      providerId,
      day,
      month,
      year,
    })

    return response.json(appointments)
  }
}
