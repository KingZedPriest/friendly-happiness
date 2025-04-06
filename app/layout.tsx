import type { Metadata } from "next";
import { Toaster } from 'sonner';
import { Oleo_Script, Urbanist, Lato } from 'next/font/google';
import Script from "next/script";

//Style
import "./styles/globals.css";

//Fonts
const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-lato',
})
const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-urbanist',
})
const oleo = Oleo_Script({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-oleo',
})

export const metadata: Metadata = {
  title: "Extraordinaire Talents",
  description: "Extraordinaire Web Application",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${urbanist.variable} ${oleo.variable} text-xs md:text-sm xl:text-base min-h-dvh font-lato antialiased text-white`} suppressHydrationWarning>
        {children}
        <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive"></Script>
        <Toaster theme="system" richColors={true} position="top-right" closeButton={true} />
      </body>
    </html>
  );
}
