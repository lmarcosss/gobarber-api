import { container } from 'tsyringe'

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCriptyHashProvider'

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider,
)
