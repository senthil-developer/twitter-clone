const FRONTEND_URL = process.env.FRONTEND_URL;

// Read HTML file
export const ResetPasswordTemplate = (link: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
    <style>
      /* Base styles */
      .bg-gray-900 {
        background-color: #1a202c;
      }

      .text-white {
        color: #ffffff;
      }

      .p-8 {
        padding: 2rem;
      }

      .rounded-lg {
        border-radius: 0.5rem;
      }

      .flex {
        display: flex;
      }

      .justify-center {
        justify-content: center;
      }

      .mb-8 {
        margin-bottom: 2rem;
      }

      /* Logo image */
      .img-rounded-full {
        border-radius: 9999px; /* A very large value for full rounding */
      }

      .bg-yellow-500 {
        background-color: #f59e0b;
      }

      .p-2 {
        padding: 0.5rem;
      }

      /* Header styles */
      .text-2xl {
        font-size: 1.5rem; /* Adjust as needed */
      }

      .font-bold {
        font-weight: bold;
      }

      /* Paragraph styles */
      .text-center {
        text-align: center;
      }

      /* Button styles */
      .py-3 {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
      }

      .px-6 {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }

      .rounded {
        border-radius: 0.25rem;
      }

      /* Links */
      a {
        color: #f59e0b;
        text-decoration: underline;
      }

      a:hover {
        text-decoration: none;
      }

      /* Social icons */
      .gap-4 {
        gap: 1rem;
      }

      /* Footer */
      .border-t {
        border-top-width: 1px;
      }

      .pt-4 {
        padding-top: 1rem;
      }

      /* Additional */
      .text-xs {
        font-size: 0.75rem; /* Adjust as needed */
      }
    </style>
  </head>
  <body>
    <div
      style="
        background-color: rgb(51, 51, 51);
        color: rgb(255, 255, 255);
        padding: 32px;
        --darkreader-inline-bgcolor: #262a2b;
        --darkreader-inline-color: #e8e6e3;
      "
      data-darkreader-inline-bgcolor=""
      data-darkreader-inline-color=""
    >
      <div style="display: flex; justify-content: center; margin-bottom: 32px">
        <img
          src="/placeholder.svg"
          alt="Your Logo"
          width="60"
          height="60"
          style="
            border-radius: 50%;
            background-color: rgb(255, 255, 0);
            padding: 8px;
            aspect-ratio: 60 / 60;
            object-fit: cover;
            --darkreader-inline-bgcolor: #999900;
          "
          data-darkreader-inline-bgcolor=""
        />
      </div>
      <div style="display: flex; justify-content: center; margin-bottom: 32px">
        <div
          style="
            color: rgb(255, 255, 0);
            height: 96px;
            width: 96px;
            --darkreader-inline-color: #ffff1a;
          "
          data-darkreader-inline-color=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
            data-darkreader-inline-fill=""
            style="--darkreader-inline-fill: currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3c0-2.09-1.66-3.75-3.75-3.75s-3.75 1.66-3.75 3.75v3h7.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <h1
        style="
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        "
      >
        Forgot your password?
      </h1>
      <p style="text-align: center; margin-bottom: 32px">
        Not to worry, we got you! Let's get you a new password.
      </p>
      <div style="display: flex; justify-content: center; margin-bottom: 32px">
        <button
          style="
            background-color: rgb(255, 255, 0);
            color: rgb(51, 51, 51);
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 4px;
            --darkreader-inline-bgcolor: #999900;
            --darkreader-inline-color: #c8c3bc;
          "
          data-darkreader-inline-bgcolor=""
          data-darkreader-inline-color=""
        >
          RESET PASSWORD
        </button>
      </div>
      <p style="text-align: center; margin-bottom: 16px; font-size: 14px">
        If you didn't request to change your password, simply ignore this email.
      </p>
      <p style="text-align: center; margin-bottom: 32px; font-size: 12px">
        This link will expire in 24 hours. If you continue to have problems
        please feel free to contact us at
        <a
          href="mailto:twitter.acc.app@gmail.com"
          style="
            color: rgb(255, 255, 0);
            text-decoration: underline;
            --darkreader-inline-color: #ffff1a;
          "
          data-darkreader-inline-color=""
          target="_blank"
        >
          twitter.acc.app@gmail.com
        </a>
      </p>
    </div>
  </body>
</html>
`;
