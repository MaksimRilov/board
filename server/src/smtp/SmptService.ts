import nodemailer from 'nodemailer';

class SmtpService {
  private transporter: nodemailer.Transporter;

  public getTransporter(): nodemailer.Transporter {
    return this.transporter;
  }

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'naomi.morar@ethereal.email',
        pass: 'E9tx4ZbHu3fjhHCsgv',
      },
    });
  }
}

export default SmtpService;
