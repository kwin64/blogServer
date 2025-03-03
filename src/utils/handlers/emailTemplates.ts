import SETTINGS from '../constants/settings';

const emailTemplates = {
  registrationConfirmationEmail(code: string) {
    return ` 
      <h1>Thank you for your registration</h1>
      <p>To finish registration, please follow the link </p>
        <a href='${SETTINGS.HTTP_PROD}/auth/confirm-email?code=${code}>complete registration</a>
    `;
  },
};

export default emailTemplates;
