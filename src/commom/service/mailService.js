import { propApi } from "../infra/propApi"

export const mailService = {
  send: async ({ destinatario, assunto, html }) => {
    const response = await propApi('send', {
      method: 'POST',
      data: {
        destinatario, assunto, html
      }
    })
  }
}