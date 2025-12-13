import type { Metadata } from "next";
import { Montserrat, Roboto, Cinzel } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

const trajan = Cinzel({
  subsets: ["latin"],
  variable: "--font-trajan",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "SNS - Exam Result Notification",
  description: "Secure Login System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} ${trajan.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
