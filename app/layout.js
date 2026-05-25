import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Luminary Studio — Creative Design Agency",
  description:
    "Luminary Studio is a premium creative design and development agency building digital experiences that grow brands. UI/UX, Web Development, Branding & Digital Marketing.",
  keywords: "design agency, web development, UI/UX, branding, digital marketing",
  openGraph: {
    title: "Luminary Studio — Creative Design Agency",
    description:
      "Premium creative design and development agency building digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-theme-bg text-theme-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
