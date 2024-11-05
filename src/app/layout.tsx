import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client"
import localFont from "next/font/local";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Café no Ponto!",
  description: "Café no Ponto! A melhor cafeteria de Brasília!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <UserProvider>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
      </body>
      </UserProvider>
    </html>
  );
}
