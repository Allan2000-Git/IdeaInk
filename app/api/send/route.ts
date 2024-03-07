import { Resend } from 'resend';
import WelcomeEmail from '@/app/emails';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmailToUser } from '@/lib/nodemailer';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function GET() {
//     // const {firstName, lastName, email} = await req.json();
//     try {
//         const {data, error} = await resend.emails.send({
//             from: 'onboarding@ideaink.dev',
//             to: 'jostonallan2000@gmail.com',
//             subject: 'Welcome to IdeaInk 🎉',
//             react: WelcomeEmail({firstName: 'Allan', lastName: 'Fernandes'}),
//         });

//         if (error) {
//             return NextResponse.json({ error });
//         }

//         return NextResponse.json({data});
//     } catch (error) {
//         return NextResponse.json({ error });
//     }
// }
export async function POST() {
    try {
        await sendEmailToUser({firstName: 'John', lastName: 'Smith'});
        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Failed to send email" });
    }
}