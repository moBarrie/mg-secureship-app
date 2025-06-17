import nodemailer from 'nodemailer';

export async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  console.log('Attempting to send email with config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USER,
      // Not logging password for security
    }
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const mailOptions = {
      from: `"SecureShip Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `SecureShip Contact: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('Sending email to:', process.env.CONTACT_EMAIL);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return info;
  } catch (error) {
    console.error('Error in sendEmail:', error);
    throw error;
  }
}
