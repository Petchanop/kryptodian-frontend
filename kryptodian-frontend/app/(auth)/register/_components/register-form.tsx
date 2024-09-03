"use client"

import { cn, parseErrorResponseMessage } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { registerAction, ResponseStatus } from "../actions/postCreateRegisterUser"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const createUserFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(1, {
        message: "email must be a valid email."
    }),
    password: z.string().min(8, {
        message: "Password should be at least 8 character"
    }),
    role: z.string(),
})

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof createUserFormSchema>>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            role: "user"
        }
    });
    async function onSubmit(payload: z.infer<typeof createUserFormSchema>) {
        setIsLoading(true)
        const { data, error } = await registerAction(payload);
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        if (error) {
            const errorResponse: ResponseStatus = parseErrorResponseMessage(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorResponse.message,
            });
        } else {
            form.reset();
            router.push('/');
        }
    }

    return (
        <Form {...form}>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2 space-y-2">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only" htmlFor="email">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Username"
                                                type="text"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only" htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="name@example.com"
                                                type="text"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only" htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Password"
                                                type="password"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </div>
                </form>
            </div >
        </Form>
    )
}