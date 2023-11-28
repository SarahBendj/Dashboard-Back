const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendWelcomeEmail(user) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NM_EMAIL,
    to: user.email,
    subject: "Welcome to Cuist'O ! 🍔🔍",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Welcome Aboard !</title>
        <style>
          
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            margin-top: 0;
          }
          p {
            margin: 0 0 20px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th,
          td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome Aboard !</h1>
          <p>Hello ${user.firstname} ${user.lastname},</p>
          <p>Welcome in the team ! Your account has been created with the following details:</p>
          <table>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Firstname</td>
              <td>${user.firstname}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>${user.lastname}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${user.email}</td>
            </tr>
            <tr>
              <td>Your login ID</td>
              <td>${user.identificant}</td>
            </tr>
            <tr>
              <td>Your password</td>
              <td>${user.password}</td>
            </tr>
          </table>
          <p>We strongly recommend that you change your password the first time you log in!</p>
          <p>If you have any questions or concerns, please do not hesitate to contact your manager.</p>

          <a href="http://83.194.221.212/login" style="background-color:#007bff;border-radius:4px;color:#fff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;mso-hide:all;">Login</a>
        </div>
      </body>
    </html>
        `,
  };

  return transporter.sendMail(mailOptions);
}

async function sendForgottenPasswordEmail(user) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NM_EMAIL,
    to: user.email,
    subject: "Password retrieval",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Your new password !</title>
   
      </head>
      <body>
        <div class="container">
          <h1>Your new password !</h1>
          <p>Hello ${user.firstname} ${user.lastname},</p>
          <p>It looks like you forgot your password! We cooked a brand new one for you :-)</p>
          <table>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Firstname</td>
              <td>${user.firstname}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>${user.lastname}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${user.email}</td>
            </tr>
            <tr>
              <td>Your login ID</td>
              <td>${user.identificant}</td>
            </tr>
            <tr>
              <td>Your password</td>
              <td>${user.password}</td>
            </tr>
          </table>
          <p>We strongly recommend that you change your password the first time you log in!</p>
          <p>If you have any questions or concerns, please do not hesitate to contact your manager.</p>

          <a href="http://83.194.221.212/login" style="background-color:#007bff;border-radius:4px;color:#fff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;mso-hide:all;">Login</a>
        </div>
      </body>
    </html>
        `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendWelcomeEmail,
  sendForgottenPasswordEmail,
};
