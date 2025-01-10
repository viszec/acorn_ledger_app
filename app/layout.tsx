export const dynamic = 'force-dynamic';
export const layoutRuntime = 'edge';

import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "Acorn Ledger | Accounting Management Platform",
  description: "Acorn Ledger is a modern accounting management platform for everyone.",
  icons: {
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ubuntu.variable}`}>{children}</body>
    </html>
  );
}
