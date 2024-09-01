import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Session, getServerSession } from "next-auth";
import "./globals.css";
import { authOptions } from "@/lib/auth/authOptions";
import { TopBar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/provider/provider";

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
  console.log("session", session);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TopBar session={session as Session} />
          {children}
          <Footer session={session as Session} />
        </Providers>
      </body>
    </html>
  );
}
