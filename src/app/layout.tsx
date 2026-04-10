import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lea21",
  description:
    "Сторінка проєкту “Дотик” зібрана у Next.js та Tailwind на основі наданих desktop і mobile дизайнів.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
