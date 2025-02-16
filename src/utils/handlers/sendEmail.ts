import transporter from '../../config/transporter';
import ApiError from './ApiError';

async function sendEmail(to: string, subject: string, template: string) {
  try {
    const info = await transporter.sendMail({
      from: `<Blog ${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: template,
    });

    return !!info;
  } catch (error: unknown) {
    throw ApiError.internal('error send email');
  }
}
export default sendEmail;
