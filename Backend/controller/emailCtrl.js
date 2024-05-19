// smsSender.js
const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: process.env.APP_EMAIL, // Your email
        pass: process.env.APP_PASSWORD,  // Your email password
    },
});

// Function to send SMS
const EmailFuncationality = async (EMAIL, subject, htmlMessage) => {
    console.log({ email: process.env.APP_EMAIL, pass: process.env.APP_PASSWORD })

    const recipientEmail = EMAIL;


    const mailOptions = {
        from: process.env.APP_EMAIL,
        to: recipientEmail,
        subject: subject, // Subject is often ignored by SMS gateways
        html: htmlMessage,
    };

    // Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        return true
    } catch (error) {
        return false
    }
};

// Export the sendSms function
module.exports = { EmailFuncationality };
