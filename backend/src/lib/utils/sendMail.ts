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
        user: "twitter.acc.app@gmail.com",
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });

    const verifyMailOptions: nodemailer.SendMailOptions = {
      from: "twitter.acc.app@gmail.com",
      to: userEmail,
      subject: "Verify Your Account",
      text: "This is a test email sent from Nodemailer with Gmail.",
      html: verifyAccTemplate(code),
    };

    const createAccMailOptions: nodemailer.SendMailOptions = {
      from: "twitter.acc.app@gmail.com",
      to: userEmail,
      subject: "create account",
      text: "This is a test email sent from Nodemailer with Gmail.",
      html: createAccTemplate(redirect_url!),
    };
    const resetPasswordMailOptions: nodemailer.SendMailOptions = {
      from: "twitter.acc.app@gmail.com",
      to: userEmail,
      subject: "Reset Your Password",
      text: "This is a test email sent from Nodemailer with Gmail.",
      html: ResetPasswordTemplate(redirect_url!),
    };

    if (type === "createAcc") {
      const res = await transporter.sendMail(
        createAccMailOptions,
        (error, info) => {
          if (error) {
            console.error("Error occurred:", error);
          } else {
            console.log("Email sent:", info);
          }
        }
      );
      return res;
    } else if (type === "resetPassword") {
      const res = await transporter.sendMail(
        resetPasswordMailOptions,
        (error, info) => {
          if (error) {
            console.error("Error occurred:", error);
          } else {
            console.log("Email sent:", info);
          }
        }
      );
      return res;
    } else {
      const res = await transporter.sendMail(
        verifyMailOptions,
        (error, info) => {
          if (error) {
            console.error("Error occurred:", error);
          } else {
            console.log("Email sent:", info);
          }
        }
      );
      return res;
    }
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
