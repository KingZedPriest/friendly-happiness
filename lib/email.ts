// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SendMailClient } from 'zeptomail';

const url = "api.zeptomail.com/";
const token = process.env.ZEPTO_API_TOKEN!;

const client = new SendMailClient({ url, token });

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: EmailPayload) => {
  return await client.sendMail({
    from: {
      address: process.env.ZEPTO_FROM_EMAIL!,
      name: "Gold Nuel Talents",
    },
    to: [
      {
        email_address: {
          address: to,
          name: to.split("@")[0],
        },
      },
    ],
    subject,
    htmlbody: html,
  });
};
