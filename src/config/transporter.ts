import nodemailer from 'nodemailer';
import SETTINGS from '../utils/constants/settings';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SETTINGS.TRANSPORTER_GMAIL_USER,
    pass: SETTINGS.TRANSPORTER_GENERATE_PASSWORD_APP,
  },
});

export default transporter;
