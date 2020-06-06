import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProvidersController from '../controllers/ProvidersController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'

const providersRouter = Router()

const providersController = new ProvidersController()
const providerDayAvailability = new ProviderDayAvailabilityController()
const providerMonthAvailability = new ProviderMonthAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersController.index)

providersRouter.get('/:providerId/month-availability', celebrate({
  [Segments.PARAMS]: {
    providerId: Joi.string().uuid().required(),
  }
}) ,providerMonthAvailability.index)

providersRouter.get('/:providerId/day-availability', celebrate({
  [Segments.PARAMS]: {
    providerId: Joi.string().uuid().required(),
  }
}), providerDayAvailability.index)

export default providersRouter
