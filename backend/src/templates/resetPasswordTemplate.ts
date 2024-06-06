const FRONTEND_URL = process.env.FRONTEND_URL;

export const ResetPasswordTemplate = (link: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password</title>
<style>
 div.my-alert {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--tw-color-gray-900) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(var(--tw-color-white) / var(--tw-text-opacity));
  padding: var(--tw-size-8);
  border-radius: var(--tw-border-radius-lg);
}

div.my-alert > div.my-alert__unique4 {
  display: flex;
  justify-content: center;
  margin-bottom: var(--tw-size-8);
}

div.my-alert > div > img {
  border-radius: var(--tw-border-radius-full);
  --tw-bg-opacity: 1;
  background-color: rgb(var(--tw-color-yellow-500) / var(--tw-bg-opacity));
  padding: var(--tw-size-2);
}

div.my-alert > div > div {
  height: var(--tw-size-24);
  width: var(--tw-size-24);
  --tw-text-opacity: 1;
  color: rgb(var(--tw-color-yellow-500) / var(--tw-text-opacity));
}

div.my-alert > div > div > svg {
  width: 100%;
  height: 100%;
}

div.my-alert > h1 {
  text-align: center;
  font-weight: var(--tw-font-weight-bold);
  font-size: var(--tw-font-size-2xl);
  line-height: var(--tw-line-height-8);
  margin-bottom: var(--tw-size-4);
}

div.my-alert > p.my-alert__unique1 {
  text-align: center;
  margin-bottom: var(--tw-size-8);
}

div.my-alert > div > button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: var(--tw-font-size-sm);
  line-height: var(--tw-line-height-5);
  /* Unknown class .ring-offset-background */
  transition-property: color, background-color, border-color, fill, stroke,
    -webkit-text-decoration-color;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, -webkit-text-decoration-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

div.my-alert > div > button:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
  /* Unknown class .ring-ring */
  --tw-ring-offset-width: 2px;
}

div.my-alert > div > button:disabled {
  pointer-events: none;
  opacity: 0.5;
}

div.my-alert > div > button:hover {
  background-color: rgb(var(--tw-color-primary) / 0.9);
}

div.my-alert > div > button {
  height: var(--tw-size-10);
  --tw-bg-opacity: 1;
  background-color: rgb(var(--tw-color-yellow-500) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(var(--tw-color-gray-900) / var(--tw-text-opacity));
  font-weight: var(--tw-font-weight-bold);
  padding-top: var(--tw-size-3);
  padding-bottom: var(--tw-size-3);
  padding-left: var(--tw-size-6);
  padding-right: var(--tw-size-6);
  border-radius: var(--tw-border-radius-default);
}

div.my-alert > p.my-alert__unique2 {
  text-align: center;
  font-size: var(--tw-font-size-sm);
  line-height: var(--tw-line-height-5);
  margin-bottom: var(--tw-size-4);
}

div.my-alert > p.my-alert__unique3 {
  text-align: center;
  font-size: var(--tw-font-size-xs);
  line-height: var(--tw-line-height-4);
  margin-bottom: var(--tw-size-8);
}

div.my-alert > p > a {
  --tw-text-opacity: 1;
  color: rgb(var(--tw-color-yellow-500) / var(--tw-text-opacity));
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}

div.my-alert > div.my-alert__unique5 {
  display: flex;
  justify-content: center;
  gap: var(--tw-size-4);
  margin-bottom: var(--tw-size-8);
}

div.my-alert > div > a {
  height: var(--tw-size-6);
  width: var(--tw-size-6);
  --tw-text-opacity: 1;
  color: rgb(var(--tw-color-yellow-500) / var(--tw-text-opacity));
}

div.my-alert > div > a > svg {
  width: 100%;
  height: 100%;
}
</style>
</head>
<body>
<div class="my-alert">
  <div class="my-alert__unique4">
    <img src="/placeholder.svg" alt="Your Logo" width="60" height="60" style="aspect-ratio: 60 / 60; object-fit: cover;">
  </div>
  <div class="my-alert__unique4">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: currentColor;">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </div>
  </div>
  <h1>Forgot your password?</h1>
  <p class="my-alert__unique1">Not to worry, we got you! Let's get you a new password.</p>
  <div class="my-alert__unique4">
    <button>
    <a href="${FRONTEND_URL}/reset-password?verify=${link}" target="_blank">
      RESET PASSWORD
    </button>
  </div>
  <p class="my-alert__unique2">If you didn\'t request to change your password, simply ignore this email.</p>
  <p class="my-alert__unique3">
    This link will expire in 24 hours. If you continue to have problems please feel free to contact us at{" "}
    <a href="#">
      twitter.acc.app@gmail.com
    </a>
  </p>
  <div class="my-alert__unique5">
    <a href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: currentColor;">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    </a>
    <a href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: currentColor;">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    </a>
    <a href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: currentColor;">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
      </svg>
    </a>
    <a href="#"></a>
  </div>
</div>
</body>
</html>

  `;
