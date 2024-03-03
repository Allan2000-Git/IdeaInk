import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaInk - Your Digital Ideation Canvas",
  description: "Sketch, brainstorm, collaborate. Turn inspiration into action!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <ConvexClientProvider>
            <Header/>
            {children}
          </ConvexClientProvider>
        </main>
      </body>
    </html>
  );
}
