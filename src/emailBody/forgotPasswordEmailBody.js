export function forgotPasswordEmailBody({ name, forgotPasswordToken }) {
  const link =
    process.env.BASE_URL + `/resetpassword?token=${forgotPasswordToken}`

  return `<div
  style="
    font-family: Arial, sans-serif;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  "
>
  <div style="text-align: center">
    <h1>Forgot Password</h1>
  </div>
  <p>Hello ${name}!</p>
  <p>
    We received a request to reset your password. Click the link below to reset
    your password: <br />
    Please note that the link is valid for only 15 minutes.
  </p>
  <a
    style="display: block; width: 100%; text-align: center; margin: 20px 0"
    href="${link}"
    >Reset Password</a
  >
  <p>
    If the link above doesn't work, try copy and pasting the link below in your
    browser<br />
    ${link}
  </p>
  <p>If you did not request a password reset, please ignore this email.</p>
  <p>Best regards,<br />Your App Team</p>
  <div style="text-align: center; margin-top: 20px">
    <p>© ${new Date().getFullYear()} Allan Robert Tan. All rights reserved.</p>
  </div>
</div>
`
}
