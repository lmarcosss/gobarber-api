import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import MailProvider from './MailProvider/implementations/MailProvider'
import IMailProvider from './MailProvider/models/IMailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerSingleton<IMailProvider>(
  'MailProvider',
  MailProvider,
)