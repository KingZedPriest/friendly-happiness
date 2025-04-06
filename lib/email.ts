import nodemailer from "nodemailer"

type EmailPayload = {
  to: string
  subject: string
  html: string
}

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zeptomail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
  })

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
  })
}