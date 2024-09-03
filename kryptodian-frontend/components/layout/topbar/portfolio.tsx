import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const addPortFolioFormSchema = z.object({
    network: z.string(),
    address: z.string(),
})

export const PortFolioMenuBar = () => {
    const form = useForm<z.infer<typeof addPortFolioFormSchema>>({
        resolver: zodResolver(addPortFolioFormSchema),
        defaultValues: {
            network: "",
            address: "",
        }
    });
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="lg">Portfolio</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Your Portfolio</DialogTitle>
                        <DialogDescription>
                            Manage your network and wallet address here.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <div className="">
                            <div className="items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="network"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="network" className="text-right">
                                               Network
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="network"
                                                    type="text"
                                                    className="col-span-3"
                                                    onChange={(event) => {
                                                        event.preventDefault()
                                                        if (event.target.value)
                                                            form.setValue("network", event.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                            </div>
                            <div className="items-center gap-2 py-2">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="address" className="text-right">
                                                Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="address"
                                                    type="text"
                                                    className="col-span-3"
                                                    onChange={(event) => {
                                                        event.preventDefault()
                                                        if (event.target.value)
                                                            form.setValue("address", event.target.value);
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