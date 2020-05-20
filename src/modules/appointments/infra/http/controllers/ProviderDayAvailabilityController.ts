import { Response, Request } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderDayAvailabilityController {
  public async index (request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { day, month, year } = request.body

    const listProviders = container.resolve(ListProviderDayAvailabilityService)

    const availability = await listProviders.execute({
      providerId,
      day,
      month,
      year,
    })

    return response.json(availability)
  }
}
