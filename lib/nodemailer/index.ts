import WelcomeEmail from "@/app/emails";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

export const sendEmailToUser = async () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
        },
    });
    
    const emailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: 'jostonallan2000@gmail.com',
        subject: 'Welcome to IdeaInk 🎉',
        react: WelcomeEmail({firstName: "John", lastName: "Smith"}),
    };

    transporter.sendMail(emailOptions, (info:any, error:any)=>{
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    })
}