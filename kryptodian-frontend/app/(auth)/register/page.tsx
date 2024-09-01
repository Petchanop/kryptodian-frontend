import Link from "next/link";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage() {
    return (
        <>
            <div className="container relative h-[800px] mx-auto flex-col justify-center md:grid lg:max-w-screen-2xl lg:grid-cols lg:py-10">
                <div className="flex flex-col space-y-6 text-center p-6">
                    <div className="text-5xl font-bold tracking-tight">
                        Create an account
                    </div>
                    <div className="text-lg text-muted-foreground">
                        Enter your username and email below to create your account
                    </div>
                    <div className="m-auto">
                        <div className="mx-auto flex flex-col justify-center sm:w-[350px]">
                            <RegisterForm />
                            <p className="p-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <Link
                                    href="/terms"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}