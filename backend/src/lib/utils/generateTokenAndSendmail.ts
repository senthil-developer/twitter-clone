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

export const generateTokenAndSendmail = async ({
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
    await sendMail.createAcc({ userEmail: email, redirect_url: token });
  } else {
    const token = jwt.sign({ email }, process.env.RESET_PASSWORD_JWT_SECRET!, {
      expiresIn: "600s",
    });
    await sendMail.resetPassword({ userEmail: email, redirect_url: token });
  }
};
