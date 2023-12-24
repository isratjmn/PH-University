import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'mnmnisrat@gmail.com',
      pass: 'upjj lwfc hqqt psky',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'mnmnisrat@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset  Your Password within 10mins', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
