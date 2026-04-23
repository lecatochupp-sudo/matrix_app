import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Matrix Pro — Premium Destiny Analysis",
  description: "Рассчитайте свою матрицу судьбы на профессиональном движке",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
