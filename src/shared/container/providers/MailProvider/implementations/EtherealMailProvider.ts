import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor (
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'garrett.pacocha38@ethereal.email',
          pass: 'smpUue1En29ZZKZqYM'
      }
  });
    
    this.client = transporter
  }
  
  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}