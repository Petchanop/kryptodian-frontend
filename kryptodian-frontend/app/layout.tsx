import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/provider/provider";
import { TopBar } from "@/components/layout/topbar/topbar";
import { Footer } from "@/components/layout/footer";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { Sidebar } from "@/components/layout/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kryptodian Wallet",
  description: "kryptoian take home test",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <Sidebar {...session?.user!} />
          <TopBar session={session as Session} />
          {children}
          <Footer session={session as Session} />
        </Providers>
      </body>
    </html>
  );
}
