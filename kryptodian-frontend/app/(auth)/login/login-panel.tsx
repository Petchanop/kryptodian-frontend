import Link from "next/link";
import { LogInForm } from "./components/login-form";
import { cn } from "@/lib/utils";

export type IloginProps = {
    className?: string;
};

export function LogInPage(props: IloginProps): JSX.Element {
    const { className } = props;
    return (
        <>
            <div className={cn("flex flex-col", className)}>
                <div className="text-5xl font-bold tracking-tight">
                    Sign in
                </div>
                <div className="text-xl text-muted-foreground">
                    <b>Not have an account ? </b>
                    <Link href="/register" className="underline">
                        create an account
                    </Link>
                </div>
                <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
                    <LogInForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
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
        </>
    )
}
