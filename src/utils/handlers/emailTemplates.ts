const emailTemplates = {
  registrationConfirmationEmail(code: string) {
    return ` <h1>Thank for your registration</h1>
             <p>To finish registration please follow the link below:<br>
                <a href='https://7abe02b4dcf9060ff42d9a2e3233cd31.serveo.net/auth/registration-confirmation?code=${code}'>complete registration</a>
             </p>`
  },
};

export default emailTemplates;
