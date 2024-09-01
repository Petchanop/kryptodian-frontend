"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { InputForm } from "@/components/forms/input";
import { cx } from "class-variance-authority";
import { PasswordField } from "@/components/forms/password-field";
import TextField from "@mui/material/TextField";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export type ILogin = z.infer<typeof loginSchema>;

export function LoginForm(
  props: React.HTMLAttributes<HTMLDivElement>
): JSX.Element {
  const router = useRouter();
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const role = searchParams.get("role");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSignup = (e: Event) => {
    e.preventDefault();
    // Perform signup logic here with signupData
    console.log('Signup data:', signupData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  return (
    <>
    </>
  );
}
