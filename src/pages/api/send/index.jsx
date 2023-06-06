const controllers = {
  send: async (req, res) => {
    let nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: 'dilon@estudioverta.com.br',
        pass: process.env.MAIL_PASS,
      },
      secure: true,
    })
    const mailData = {
      from: 'financeiro@estudioverta.com.br',
      to: req.body.destinatario,
      subject: req.body.assunto,
      text: req.body.assunto,
      html: req.body.html,
    }
    transporter.sendMail(mailData, function (err, info) {
      if (err)
        res.status(200).json({ message: err });
      else
        res.status(200).json({ message: info });
    })
  }
}

const controllerBy = {
  POST: controllers.send,
}

export default async function handler(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

    res.status(404).json({ message: 'Not found' });
}