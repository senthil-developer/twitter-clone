import nodemailer from "nodemailer";
import { google } from "googleapis";
import { ResetPasswordTemplate } from "../../templates/resetPasswordTemplate";
import { verifyAccTemplate } from "../../templates/verifyAccTemplate";
import { generateVerificationCode } from "./generateVerificationCode";
import logger from "./logger";
import { createAccTemplate } from "../../templates/createAccTemplate";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const redirectUri = process.env.REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri,
});

oAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

interface Props {
  userEmail: string;
  redirect_url?: string;
  type?: "verify" | "resetPassword" | "createAcc";
}

export const code = generateVerificationCode(6);

async function mail({ userEmail, redirect_url, type }: Props) {
  try {
    const accessToken = (await oAuth2Client.getAccessToken()) as string;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.FROM_USER,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });

    let mailOptions: nodemailer.SendMailOptions = {};

    if (type === "createAcc") {
      mailOptions = {
        from: process.env.FROM_USER,
        to: userEmail,
        subject: "create account",
        text: "This is a test email sent from Nodemailer with Gmail.",
        html: createAccTemplate(redirect_url!),
      };
    }
    if (type === "resetPassword") {
      mailOptions = {
        from: process.env.FROM_USER,
        to: userEmail,
        subject: "Reset Your Password",
        text: "This is a test email sent from Nodemailer with Gmail.",
        html: ResetPasswordTemplate(redirect_url!),
      };
    }
    if (type === "verify") {
      mailOptions = {
        from: process.env.FROM_USER,
        to: userEmail,
        subject: "Verify Your Account",
        text: "This is a test email sent from Nodemailer with Gmail.",
        html: verifyAccTemplate(code),
      };
    }

    const res = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", res);
  } catch (err) {
    logger.error(`Error occurred while sending email: ${err}`);
    throw err;
  }
}

export const sendMail = {
  verify: ({ userEmail }: Props) => mail({ userEmail, type: "verify" }),
  resetPassword: ({ userEmail, redirect_url }: Props) =>
    mail({ userEmail, redirect_url, type: "resetPassword" }),
  createAcc: ({ userEmail, redirect_url }: Props) =>
    mail({ userEmail, redirect_url, type: "createAcc" }),
};
