import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const createProfileFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
})

export const EditProfile = () => {
    const form = useForm<z.infer<typeof createProfileFormSchema>>({
        resolver: zodResolver(createProfileFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
        }
    });
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
                                                    id="First name"
                                                    defaultValue="First name"
                                                    type="text"
                                                    className="col-span-3"
                                                    onChange={(event) => {
                                                        event.preventDefault()
                                                        if (event.target.value)
                                                            form.setValue("firstName", event.target.value);
                                                    }}
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
                                                    id="Last name"
                                                    defaultValue="Last name"
                                                    type="text"
                                                    className="col-span-3"
                                                    onChange={(event) => {
                                                        event.preventDefault()
                                                        if (event.target.value)
                                                            form.setValue("lastName", event.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                            </div>
                        </div>
                    </Form>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    )
}