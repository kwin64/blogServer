import nodemailer from 'nodemailer';
import SETTINGS from '../utils/constants/settings';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SETTINGS.EMAIL,
    pass: SETTINGS.EMAIL_PASSWORD,
  },
});

export default transporter;
