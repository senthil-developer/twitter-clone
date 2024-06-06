import jwt from "jsonwebtoken";
import { sendMail } from "../../lib/utils/sendMail";

type Props = {
  email: string;
  type: "createAcc" | "resetPassword";
};

interface createAcc extends Props {
  username?: string;
  password?: string;
  fullName?: string;
}

export const generateTokenAndSendmail = ({
  email,
  fullName,
  password,
  username,
  type,
}: createAcc) => {
  if (type === "createAcc") {
    const token = jwt.sign(
      { email, username, password, fullName },
      process.env.CREATE_ACC_JWT_SECRET!,
      {
        expiresIn: "600s",
      }
    );
    sendMail.createAcc({ userEmail: email, redirect_url: token });
    console.log(token);
  } else {
    const token = jwt.sign({ email }, process.env.RESET_PASSWORD_JWT_SECRET!, {
      expiresIn: "60s",
    });
    sendMail.resetPassword({ userEmail: email, redirect_url: token });
  }
};
