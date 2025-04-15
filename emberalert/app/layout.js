import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EmberAlert",
  description: "A wildfire and air quality tracking web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <nav className="flex justify-around items-center bg-black h-14 text-white font-medium tracking-wide">
          <Link href="/" className="hover:text-gray-300 transition">Home</Link>
          <Link href="/map/wildfires" className="hover:text-red-400 transition">Wildfire Map</Link>
          <Link href="/map/airquality" className="hover:text-green-400 transition">Air Quality Map</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
