import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { ModalProvider } from "@/context/modal-context";
import { GlobalModal } from "@/components/global-modal";

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
