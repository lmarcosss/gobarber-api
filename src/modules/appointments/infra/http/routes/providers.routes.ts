import { Router } from 'express'

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
providersRouter.get('/:providerId/month-availability', providerMonthAvailability.index)
providersRouter.get('/:providerId/day-availability', providerDayAvailability.index)


export default providersRouter
