import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(request: Request) {
  try {
    console.log('Received contact form submission');
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactFormSchema.parse(body);
    console.log('Form data validated successfully');
    
    // Send the email
    console.log('Attempting to send email...');
    await sendEmail(validatedData);
    console.log('Email sent successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully" 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid form data", errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
