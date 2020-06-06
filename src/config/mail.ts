interface IMailConfig {
  driver: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: 'leonardo@rocketseat.com.br',
      name: 'Leonardo Marcos'
    } 
  }
} as IMailConfig