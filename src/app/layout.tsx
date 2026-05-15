import type { Metadata } from "next";
import { siteContent } from "@/resources/site-content";
import "./globals.css";
import "@/resources/theme.css";

export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
