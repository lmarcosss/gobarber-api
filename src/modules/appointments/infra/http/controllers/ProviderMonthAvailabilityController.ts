import { Response, Request } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

export default class ProviderMonthAvailabilityController {
  public async index (request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { month, year } = request.body


    const listProviders = container.resolve(ListProviderMonthAvailabilityService)

    const availability = await listProviders.execute({
      providerId,
      month,
      year,
    })

    return response.json(availability)
  }
}
