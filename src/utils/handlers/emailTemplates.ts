const emailTemplates = {
  registrationConfirmationEmail(code: string) {
    return ` <h1>Thank for your registration</h1>
             <p>To finish registration please follow the link below:<br>
                <a href='https://2962f94b296f4cec265b86427b0fedff.serveo.net/auth/registration-confirmation?code=${code}'>complete registration</a>
             </p>`;
  },
};

export default emailTemplates;
