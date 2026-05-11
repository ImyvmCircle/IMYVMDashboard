import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IMYVM Dashboard",
  description: "IMYVM Minecraft 服务器门户与玩家数据仪表盘",
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
