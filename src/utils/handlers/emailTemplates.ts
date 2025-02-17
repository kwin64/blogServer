const emailTemplates = {
  registrationConfirmationEmail(code: string) {
    return ` <h1>Thank for your registration</h1>
             <p>To finish registration please follow the link below:<br>
                <a href='https://blog-server-nine-theta.vercel.app/auth/registration-confirmation?code=${code}'>complete registration</a>
             </p>`;
  },
};

export default emailTemplates;
