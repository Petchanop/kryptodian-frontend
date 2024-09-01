import { InfoPanel } from "@/components/main-page/info-panel";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LogInPage } from "./(auth)/login/login-panel";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="min-h-screen p-10 bg-zinc-200">
      <div className="container relative h-[800px] mx-auto flex-col items-center justify-center md:grid lg:max-w-screen-2xl lg:grid-cols-2 lg:px-0">
        <div className="m-auto">
          <InfoPanel />
        </div>
        <div className="m-auto">
          <LogInPage className="text-center space-y-10"/>
        </div>
      </div>
    </main>
  );
}
