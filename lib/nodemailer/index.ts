import nodemailer from "nodemailer";

interface IWelcomeEmailProps {
    firstName?: string;
    lastName?: string;
}

const logo = "/ideaink-eraser.png"

export const sendEmailToUser = async ({firstName, lastName}:IWelcomeEmailProps) => {
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
        html: `
        <html lang="en">
            <head>
                <!-- Head content goes here -->
            </head>
            <body class="bg-white my-auto mx-auto font-sans">
                <div class="my-10 mx-auto p-5" style="width: 465px;">
                    <div class="mt-8">
                        <img src=${logo} width="80" height="80" alt="IdeaInk Logo" class="my-0 mx-auto">
                    </div>
                    <p class="text-sm">
                        Hello ${firstName} ${lastName},
                    </p>
                    <p class="text-sm text-justify">
                        We're thrilled to welcome you to <strong>IdeaInk!</strong> You're now part of a vibrant community of creators. Stay tuned for exciting updates, inspiration, and resources to fuel your creative journey. Happy creating!
                    </p>
                    <div class="text-center mt-32 mb-32">
                        <a href="https://resend.com" class="bg-logo_primary rounded text-white text-sm font-medium no-underline text-center px-7 py-3">Get Started</a>
                    </div>
                    <p class="text-sm">
                        Cheers,
                        <br>
                        The IdeaInk Team
                    </p>
                </div>
            </body>
        </html>
        `
    };

    transporter.sendMail(emailOptions, (info:any, error:any)=>{
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    })
}