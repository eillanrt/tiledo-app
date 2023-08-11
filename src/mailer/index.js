import nodemailer from 'nodemailer'

export async function sendMail(
  { sender, recipient, subject, body },
  { useHTMLBody = false }
) {
  const { EMAIL_SERVER, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, NODE_ENV } =
    process.env

  const transport = nodemailer.createTransport({
    host: EMAIL_SERVER,
    port: EMAIL_PORT,
    secure: NODE_ENV === 'production' || NODE_ENV === 'preview', // Secure connection during prod and preview; use yahoo SMTP server during production and preview
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  transport.verify((error) => {
    if (error) {
      throw error
    }
  })

  const mailOptions = {
    from: sender,
    to: recipient,
    subject,
  }

  if (useHTMLBody) {
    mailOptions.html = body
  } else {
    mailOptions.text = body
  }

  return await transport.sendMail(mailOptions)
}
