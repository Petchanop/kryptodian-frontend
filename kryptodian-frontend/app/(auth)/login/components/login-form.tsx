"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signIn, SignInResponse } from "next-auth/react";
import { TSVaction } from "@/src/schemas/server-action"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const LogInFormSchema = z.object({
    userNameOrEmail: z.string(),
    password: z.string().min(8, {
        message: "Password should be at least 8 character"
    }),
})

export function LogInForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [UserNameOrEmail, setUserNameOrEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof LogInFormSchema>>({
        resolver: zodResolver(LogInFormSchema),
        defaultValues: {
            userNameOrEmail: "",
            password: "",
        }
    });

    async function onSubmit(payload: z.infer<typeof LogInFormSchema>) {
        setIsLoading(true)
        signIn("credentials", {
            username: payload.userNameOrEmail.includes("@") ? "" : payload.userNameOrEmail,
            email: payload.userNameOrEmail.includes("@") ? payload.userNameOrEmail : "",
            password: payload.password,
            redirect: false,
        }).then((res: SignInResponse | undefined) => {
            console.log(res)
            if (typeof res !== undefined) {
                if (res?.error) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: res.error,
                    });
                } else if (res?.ok) {
                    router.push(`/`);
                    form.reset();
                    router.refresh();
                }
            }
        });
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)

    }

    useEffect(() => {
        const SetPayloadInput = setTimeout(() => {
            if (UserNameOrEmail)
                form.setValue("userNameOrEmail", UserNameOrEmail);
            if (password)
                form.setValue("password", password);
        }, 500);
        return () => clearTimeout(SetPayloadInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UserNameOrEmail, password])
    return (
        <Form {...form}>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2 space-y-2">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="userNameOrEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only" htmlFor="email">
                                            Username or Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="userOremail"
                                                placeholder="Username or Email"
                                                type="text"
                                                autoCapitalize="none"
                                                autoComplete="none"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                onChange={(event) => {
                                                    event.preventDefault();
                                                    setUserNameOrEmail(event.target.value);
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                        </div>
                        <div className="grid gap-1">
                            <FormLabel className="sr-only" htmlFor="email">
                                Password
                            </FormLabel>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setPassword(event.target.value)
                                }}

                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                </div>
            </div>
        </Form>
    )
}