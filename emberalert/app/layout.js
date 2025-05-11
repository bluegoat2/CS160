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
<<<<<<< HEAD
        <nav className="flex justify-around items-center bg-black h-14 text-white font-medium tracking-wide">
          <Link href="/" className="hover:text-gray-300 transition">Home</Link>
          <Link href="/map/wildfires" className="hover:text-red-400 transition">Wildfire Map</Link>
          <Link href="/map/airquality" className="hover:text-green-400 transition">Air Quality Map</Link>
          <Link href="/news" className="hover:text-purple-400 transition">Wildfire News</Link>
        </nav>
        <main>{children}</main>
=======
        <nav className="flex justify-around items-center bg-black h-14 text-white">
          <Link href="/">Home</Link>
	  <Link href="/map">Map</Link>
          <Link href="/impact">Impact</Link>
          <Link href="/top5">Top 5 Wildfires</Link>
        </nav>

        {/* Main Content */}
        <div className="mt-4">
          {children} {/* This renders the content from page.js for the current route */}
        </div>
>>>>>>> origin/jugTest
      </body>
    </html>
  );
}
