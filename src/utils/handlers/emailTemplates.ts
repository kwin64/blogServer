const emailTemplates = {
  registrationConfirmationEmail(code: string) {
    return ` 
      <h1>Thank you for your registration</h1>
      <p>To finish registration, please click the button below:</p>
      <form action="https://7abe02b4dcf9060ff42d9a2e3233cd31.serveo.net/auth/registration-confirmation" method="POST">
        <input type="hidden" name="code" value="${code}">
        <button type="submit">Complete Registration</button>
      </form>
    `;
  },
};

export default emailTemplates;
