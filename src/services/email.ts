import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

// Initialize EmailJS with public key
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

type EmailData = {
  to_email: string;
  application_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  brand: string;
  category: string;
};

export const sendNotificationEmail = async (data: EmailData): Promise<void> => {
  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      data
    );
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Don't throw the error to prevent breaking the application flow
  }
};