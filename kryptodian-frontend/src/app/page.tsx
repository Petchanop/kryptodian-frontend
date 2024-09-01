import { authOptions } from "@/lib/auth/authOptions";
import { ArrowRightIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from 'next/image';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return <>
    <main className="flex min-h-screen flex-col">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 py-10 md:w-3/5 md:px-20">
        </div>
        <div className="flex items-center justify-center p-6 md:w-2/5 md:px-28 md:py-12">
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </div>
      </div>
    </main></>;
}