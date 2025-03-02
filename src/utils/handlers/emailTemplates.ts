import SETTINGS from '../constants/settings';

const emailTemplates = {
  registrationConfirmationEmail(code: string) {
    return ` 
      <h1>Thank you for your registration</h1>
      <p>To finish registration, please click the button below:</p>
      <a href="${SETTINGS.HTTP_PROD}/auth/confirm-email?code=${code}>
        complete registration
      </a>
    `;
  },
  confirmEmailTemplate(code: string) {
    return `
    <h1>Confirming your email...</h1>
    <script>
        fetch("${SETTINGS.HTTP_PROD}/auth/registration-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: "${code}" })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/success";
            } else {
                window.location.href = "/error"; // редирект на страницу ошибки
            }
        })
        .catch(err => {
            console.error("Error:", err);
            window.location.href = "/error";
        });
    </script>
      `;
  },
};

export default emailTemplates;
