import './global.css';
import localFont from "next/font/local";

const geist = localFont({
  src: [
    {
      path: "../../public/fonts/Geist/Geist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geist/Geist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMono/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "ShortLink",
  description: "ShortLink is a URL shortening service that allows users to create short aliases for long URLs. These aliases can be easily shared, and when accessed, they redirect users to the original, longer URL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

