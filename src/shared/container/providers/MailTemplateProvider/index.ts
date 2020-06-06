import { container } from 'tsyringe'

import HandleBarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider'
import IMailTemplateProvider from './models/IMailTemplateProvider'

const providers = {
  handlebars: HandleBarsMailTemplateProvider
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
)
