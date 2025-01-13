// mail.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {



    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });
   
   
   
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'lilla.terry55@ethereal.email',
        pass: 'yQQSg25MR1QwugbNnN',
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `http://localhost:3001/api/auth/reset-password?token=${token}`;

    await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Password Reset Request",
        text: `Hello,\n\nYou can use the link below to reset your password:\n\n${resetLink}\n\nThis link is valid for 15 minutes.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nYour App Team`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="text-align: center; color: #4CAF50;">Password Reset</h1>
            <p>Hello,</p>
            <p>Click the link below to reset your password:</p>
            <div style="text-align: center; margin: 20px;">
              <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </div>
            <p>This link is valid for 15 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>Your App Team</p>
          </div>
        `,
      });
  }
}