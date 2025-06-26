import nodemailer from 'nodemailer';

export async function sendEmail(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  // Log email configuration (without sensitive data)
  const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      // Password omitted for security
    }
  };
  console.log('SMTP Configuration:', smtpConfig);

  // Validate required environment variables
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM', 'CONTACT_EMAIL'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }

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
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const mailOptions = {
      from: `"Global Atlantic Express Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `Global Atlantic Express Contact: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;

  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
}

export async function sendShipmentNotification(data: {
  trackingId: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  parcelType: string;
  weight: string;
  value: string;
  destination: string;
  origin: string;
  notes?: string;
}) {
  console.log('Sending shipment notification email to admin...');

  // Validate required environment variables
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM', 'CONTACT_EMAIL'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }

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
    console.log('Verifying SMTP connection for shipment notification...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const mailOptions = {
      from: `"Global Atlantic Express" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.senderEmail,
      subject: `New Shipment Created - Tracking ID: ${data.trackingId}`,
      html: `
        <h2>New Shipment Created</h2>
        <p><strong>Tracking ID:</strong> ${data.trackingId}</p>
        
        <h3>Sender Information</h3>
        <ul>
          <li><strong>Name:</strong> ${data.senderName}</li>
          <li><strong>Email:</strong> ${data.senderEmail}</li>
          <li><strong>Phone:</strong> ${data.senderPhone}</li>
        </ul>
        
        <h3>Receiver Information</h3>
        <ul>
          <li><strong>Name:</strong> ${data.receiverName}</li>
          <li><strong>Email:</strong> ${data.receiverEmail}</li>
          <li><strong>Phone:</strong> ${data.receiverPhone}</li>
        </ul>
        
        <h3>Shipment Details</h3>
        <ul>
          <li><strong>Type:</strong> ${data.parcelType}</li>
          <li><strong>Weight:</strong> ${data.weight}</li>
          <li><strong>Value:</strong> ${data.value}</li>
          <li><strong>From:</strong> ${data.origin}</li>
          <li><strong>To:</strong> ${data.destination}</li>
          ${data.notes ? `<li><strong>Notes:</strong> ${data.notes}</li>` : ''}
        </ul>
        
        <p>Please process this shipment and update the status accordingly.</p>
      `,
    };

    console.log('Sending shipment notification email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Shipment notification email sent successfully:', info.messageId);
    return info;

  } catch (error) {
    console.error('Failed to send shipment notification email:', error);
    throw error;
  }
}
