import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

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
            {children}
            <Toaster />
          </ConvexClientProvider>
        </main>
      </body>
    </html>
  );
}
