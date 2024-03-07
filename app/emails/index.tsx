import { Body, Button, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Text, Tailwind } from '@react-email/components';
import * as React from 'react';

interface IWelcomeEmailProps {
    firstName?: string;
    lastName?: string;
}

const logo = "/ideaink-eraser.png"

const WelcomeEmail = ({firstName, lastName}: IWelcomeEmailProps) => {
    const previewText = `Welcome to IdeaInk, ${firstName} ${lastName}!`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="my-10 mx-auto p-5 w-[465px]">
                        <Section className="mt-8">
                            <Img
                            src={logo}
                            width="80"
                            height="80"
                            alt="IdeaInk Logo"
                            className="my-0 mx-auto"
                            />
                        </Section>
                        <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
                            Welcome to <strong>IdeaInk</strong>🚀, {firstName} {lastName}!
                        </Heading>
                        <Text className="text-sm">
                            Hello {firstName},
                        </Text>
                        <Text className="text-sm">
                        We're thrilled to welcome you to <strong>IdeaInk!</strong> You're now part of a vibrant community of creators. Stay tuned for exciting updates, inspiration, and resources to fuel your creative journey. Happy creating!
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#38bdff] rounded text-white text-sm font-medium no-underline text-center px-7 py-3"
                                href="https://resend.com"
                            >
                                Get Started
                            </Button>
                        </Section>
                        <Text className="text-sm">
                            Cheers,
                            <br/>
                            The IdeaInk Team
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WelcomeEmail;