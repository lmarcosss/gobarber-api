import { Router } from 'express'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import multer from 'multer'
import uploadConfig from '@config/upload'

const usersRouter = Router()
const upload = multer(uploadConfig)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post('/', usersController.create)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
)

export default usersRouter
