
export const contactUsEmail = (
    email,
    name,
    message
  ) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
          <a href="#"><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/floaura-c0f69.appspot.com/o/images%2FFloaura.png?alt=media&token=21c3e73a-9fd0-41b4-995b-453921f83fd8"
                    alt="Floaura"></a>
            <div class="message">Contact Form Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.
                </p>
                <p>Here are the details you provided:</p>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>
                <p>We appreciate your interest and will get back to you shortly. </p>
            </div>
            <div class="support">If you have any further questions or need immediate assistance, please feel free to reach
                out to us at <a href="mailto:sumannmaji@gmail.com">sum@nmaji17</a>.  We are here to help!</div>
        </div>
    </body>
    
    </html>`
  }