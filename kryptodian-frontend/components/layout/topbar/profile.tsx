"user client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postUpdateProfile, TPostUpdateProfile } from "./_actions/postUpdateProfile";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { TMeGet } from "@/nextauth";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createSidebarStore } from "./topbar";

const createProfileFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
})

type TEditProfile = {
    id: string;
    editProfileOpen?: boolean;
    setEditProfileOpen?: (open: boolean) => void;
}

export const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mouseup', handleClickOutside);
        document.addEventListener('touchend', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
            document.removeEventListener('touchend', handleClickOutside);
        };
    }, [callback]);
    return ref;
};

export function Profile(props: TMeGet) {
    const sidebarStore = createSidebarStore();
    async function handleSignOut() {
        await signOut()
    }
    return (
        <>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent"
                onClick={() => sidebarStore.setSidebarState()}
            >
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Button>
        </>
    )
}

export const EditProfile = forwardRef(function EditProfile(props: TEditProfile, ref) {
    const { id } = props;
    const [loading, setIsLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof createProfileFormSchema>>({
        resolver: zodResolver(createProfileFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
        }
    });
    async function onSubmit(payload: TPostUpdateProfile) {
        setIsLoading(true)
        const res = await postUpdateProfile(id, payload);
        console.log(res)
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="lg">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="">
                                <div className="items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="First name" className="text-right">
                                                    First name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="First name"
                                                        type="text"
                                                        className="col-span-3"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )} />
                                </div>
                                <div className="items-center gap-2 py-2">
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="Last name" className="text-right">
                                                    Last name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Last name"
                                                        type="text"
                                                        className="col-span-3"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )} />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={loading}>
                                    {loading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog >

        </>
    )
})