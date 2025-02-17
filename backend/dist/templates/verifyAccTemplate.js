"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccTemplate = void 0;
const verifyAccTemplate = (code) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>

</head>
<body>
<div
  style="font-family: Helvetica, Arial, sans-serif; background-color: rgb(245, 245, 245); padding: 40px; --darkreader-inline-bgcolor: #1e2021;"
  data-darkreader-inline-bgcolor=""
>
  <table
    style="width: 100%; max-width: 600px; margin: 0px auto; background-color: rgb(255, 255, 255); border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px; --darkreader-inline-bgcolor: #181a1b; --darkreader-inline-boxshadow: rgba(0, 0, 0, 0.1) 0px 2px 8px;"
    data-darkreader-inline-bgcolor=""
    data-darkreader-inline-boxshadow=""
  >
    <tr>
      <td style="padding: 40px;">
        <table style="width: 100%;">
          <tr>
            <td>
              <img src="/placeholder.svg" alt="Company Logo" style="height: 40px;" />
            </td>
          </tr>
          <tr>
            <td style="text-align: center; padding-top: 40px;">
              <h1
                style="font-size: 32px; font-weight: bold; color: rgb(51, 51, 51); margin-bottom: 16px; --darkreader-inline-color: #c8c3bc;"
                data-darkreader-inline-color=""
              >
                Verify Your Account
              </h1>
              <p
                style="font-size: 16px; color: rgb(102, 102, 102); margin-bottom: 32px; --darkreader-inline-color: #a8a095;"
                data-darkreader-inline-color=""
              >
                Please enter the following 6-digit verification code to complete your account verification. This
                code will expire in 5 minutes.
              </p>
              <div
                style="background-color: rgb(245, 245, 245); padding: 24px; border-radius: 8px; margin-bottom: 32px; --darkreader-inline-bgcolor: #1e2021;"
                data-darkreader-inline-bgcolor=""
              >
                <h2
                  style="font-size: 48px; font-weight: bold; color: rgb(51, 51, 51); text-align: center; --darkreader-inline-color: #c8c3bc;"
                  data-darkreader-inline-color=""
                >
                  ${code}
                </h2>
              </div>
              <button
              onclick={() => {
    navigator.clipboard.writeText(code)
  }}
                style="display: inline-block; background-color: rgb(0, 123, 255); color: rgb(255, 255, 255); font-size: 16px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 4px; transition: background-color 0.3s ease 0s; border: none; cursor: pointer; --darkreader-inline-bgcolor: #0062cc; --darkreader-inline-color: #e8e6e3; --darkreader-inline-border-top: none; --darkreader-inline-border-right: none; --darkreader-inline-border-bottom: none; --darkreader-inline-border-left: none;"
                data-darkreader-inline-bgcolor=""
                data-darkreader-inline-color=""
                data-darkreader-inline-border-top=""
                data-darkreader-inline-border-right=""
                data-darkreader-inline-border-bottom=""
                data-darkreader-inline-border-left=""
              >
                Copy Code
              </button>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
</body>
</html>

      `;
exports.verifyAccTemplate = verifyAccTemplate;
