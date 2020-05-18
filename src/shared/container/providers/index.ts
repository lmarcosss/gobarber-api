import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import IMailProvider from './MailProvider/models/IMailProvider'

import HandleBarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplateProvider,
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
)
