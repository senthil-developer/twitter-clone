export const verifyAccTemplate = (code: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
<style>
  /* Reset CSS */
  body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  /* Wrapper */
  .wrapper {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  /* Heading */
  h2 {
    color: #333333;
    font-size: 24px;
    margin-bottom: 20px;
  }

  /* Paragraphs */
  p {
    color: #666666;
    margin-bottom: 10px;
  }

  /* Strong */
  strong {
    color: #000000;
  }

  /* Button */
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
  }

  /* Button Link */
  .button:hover {
    background-color: #0056b3;
  }
</style>
</head>
<body>
<div class="wrapper">
  <h2>Email Verification</h2>
  <p>Hello,</p>
  <p>Your verification code is: <strong>${code}</strong></p>
  <p>Please use this code to verify your email address.</p>
  <p>If you didn't request this, you can safely ignore this email.</p>
  <p>Thank you!</p>
</div>
</body>
</html>

      `;
