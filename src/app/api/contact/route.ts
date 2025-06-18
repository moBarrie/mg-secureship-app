import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Phone number must be at least 7 digits."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(request: Request) {
  try {
    // Log request received with timestamp
    console.log(`[${new Date().toISOString()}] Received contact form submission request`);

    // Check if environment variables are set
    const envCheck = {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: !!process.env.SMTP_PORT,
      SMTP_SECURE: !!process.env.SMTP_SECURE,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
      SMTP_FROM: !!process.env.SMTP_FROM,
      CONTACT_EMAIL: !!process.env.CONTACT_EMAIL,
    };
    console.log('Environment variables status:', envCheck);

    // Check if any required env vars are missing
    const missingEnvVars = Object.entries(envCheck)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingEnvVars.length > 0) {
      console.error('Missing required environment variables:', missingEnvVars);
      return NextResponse.json({ 
        success: false, 
        message: "Server configuration error. Please try again later.",
        debug: `Missing env vars: ${missingEnvVars.join(', ')}` 
      }, { status: 500 });
    }

    let body;
    try {
      body = await request.json();
      console.log('Received form data:', {
        ...body,
        message: body.message?.substring(0, 50) + '...' // Truncate message for logging
      });
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return NextResponse.json({ 
        success: false, 
        message: "Invalid request format" 
      }, { status: 400 });
    }
    
    // Validate the request body
    try {
      const validatedData = contactFormSchema.parse(body);
      console.log('Form data validation passed');
      
      // Send the email
      console.log('Attempting to send email...');
      await sendEmail(validatedData);
      console.log('Email sent successfully');
      
      return NextResponse.json({ 
        success: true, 
        message: "Thank you! Your message has been sent successfully." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors);
        return NextResponse.json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        }, { status: 400 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in contact form submission:', error);
    
    // Detailed error logging
    const errorDetails = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error;
    console.error('Error details:', errorDetails);
    
    return NextResponse.json({ 
      success: false, 
      message: "Failed to send message. Please try again later.",
      debug: errorDetails
    }, { status: 500 });
  }
}
