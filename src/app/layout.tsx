import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { ModalProvider } from "@/context/modal-context";
import { GlobalModal } from "@/components/global-modal";

export const metadata: Metadata = {
  metadataBase: new URL("https://10005.kr"),
  title: {
    default: "흑만두의 포트폴리오 & 블로그",
    template: "%s | 흑만두의 포트폴리오 & 블로그",
  },
  description: "진행하고 있는 프로젝트들이나 일상을 공유합니다.",
  openGraph: {
    title: "흑만두의 포트폴리오 & 블로그",
    description: "진행하고 있는 프로젝트들이나 일상을 공유합니다.",
    url: "https://10005.kr",
    siteName: "흑만두의 블로그",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "JMH Portfolio & Blog",
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: "'NanumSquare', sans-serif" }} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar session={session} />
              <main className="flex-1">{children}</main>
            </div>
            <GlobalModal />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
