import React from "react";
import Image from "next/image";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NutriTrackLogoColored from "@/public/NutriTruck_Logo_color.svg";
import WaveLightMobile from "@/public/mobile_wave_light.svg";

import { LoginForm } from "./_components/login-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";

type ILoginFormProps = {};

export default async function LoginPage(props: ILoginFormProps) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="relative flex-col items-center justify-center h-screen lg:grid lg:w-auto lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* <InfoPannel className="relative flex-col hidden h-full text-secondary bg-primary lg:flex" /> */}
      <h1>Later</h1>
      <div className="grid items-center justify-center w-full h-full p-0 lg:p-8 lg:bg-[#EFEFDC] bg-primary text-secondary lg:text-primary">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src={NutriTrackLogoColored}
            alt="logo"
            className="lg:hidden"
            width={150}
          />
          <Card className="z-10 mx-auto flex flex-col lg:bg-[#B3C3B36B] bg-[#B3C3B3] justify-center p-5 sm:w-[400px] rounded-3xl self-center lg:border-none lg:shadow-none">
            <h1 className="flex flex-col space-y-2 text-2xl font-semibold racking-tight text-left text-primary">
              เข้าสู่ระบบ
            </h1>
            <LoginForm />
          </Card>
        </div>
        <Image
          src={WaveLightMobile}
          alt="wave_alt"
          className="absolute bottom-0 z-0 w-full lg:hidden"
        />
      </div>
    </div>
  );
}
