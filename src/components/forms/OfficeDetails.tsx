"use client"
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { initUser, upsertAgency } from "@/lib/queries";
import { Button } from "../ui/button";
import { v4 } from "uuid";
import Loading from "../global/Loading";
import { AgencyHub, Postoffice } from "@prisma/client";

type Props = {
    data: Partial<Postoffice>
}

const OfficeFormSchema = z.object({
    name: z.string().min(2, {message: 'Agency name must be atleast 2 chars.'}),
    officeEmail: z.string().min(1),
    officePhone: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    pincode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
})

const OfficeDetails = ({ data }: Props) => {
    const { toast } = useToast();
    const router = useRouter();
    const [deletingAgency, setDeletingAgency] = useState(false);
    const form = useForm<z.infer<typeof OfficeFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(OfficeFormSchema),
        defaultValues: {
            name: data?.name,
            officeEmail: data?.postofficeEmail,
            officePhone: data?.postofficePhone,
            address: data?.address,
            city: data?.city,
            pincode: data?.pincode,
            state: data?.state,
            // country: data?.,
        },
    })
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data])

    const handleSubmit = async (values: z.infer<typeof OfficeFormSchema>) => {
        try {
            let newUser;
            newUser = await initUser({ role: "OFFICE_ADMIN" })
            if (!data?.id) {
                const response = await upsertOffice({
                    id: data?.id ? data.id : v4(),
                    address: values.address,
                    city: values.city,
                    state: values.state || "ASSAM",
                    officePhone: values.officePhone,
                    country: values.country,
                    name: values.name,
                    pincode: values.pincode,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    officeEmail: values.officeEmail,
                })
                toast({
                    title: `Created Hub, ${values.name}`,
                })
            // if (data?.id) return router.(`/${response?.id}`)
                // if (response) {
                //     return router.refresh()
                // }
            }
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: "Oopse!",
                description: "could not create your agency",
            })
        }
    }

    // const handleDeleteAgency = async () => {
    //     if (!data?.id) return
    //     setDeletingAgency(true)

        // try {
        //     const response = await deleteAgency(data.id)
        //     toast({
        //         title: "Deleted Agency",
        //         description: "Deleted your agency and all subaccounts"
        //     })
        // } catch (error) {
        //     console.log(error)
        //     toast({
        //         variant: "destructive",
        //         title: "Oopse!",
        //         description: "could not delete your agency",
        //     })
        // }
        // setDeletingAgency(false)
    // }

    return (
        <AlertDialog>
            <Card className="w-[80%] mt-[64px]">
                <CardHeader className="flex flex-row bg-muted">
                    <div>
                    <CardTitle className="text-4xl mb-2 font-bold text-foreground tracking-wide">Post Office Information</CardTitle>
                    <CardDescription>
                        Lets create a reliable and responsive place for your operations, and help you provide better services.
                    </CardDescription>
                    </div>
                    {/* <Image src={'/DOP-post.png'} alt="DOP Logo" height={200} width={300} className="h-[200px]" /> */}
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4">
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="Your office name"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="officeEmail"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>Office Email</FormLabel>
                                    <FormControl>
                                        <Input
                                        className="placeholder:text-muted"
                                        readOnly
                                        placeholder="Email"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="officePhone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>Office Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="Phone"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Address/residence</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="123 near.."
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="State"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>city</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="City"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>pincode</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="pincode"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                    <Input
                                        value={'India'}
                                        // placeholder="Country"
                                        // {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                // disabled={isLoading}
                            >
                                { isLoading ? <Loading /> : "Save Agency Information" }
                            </Button>
                        </form>
                    </Form>
                    {/* <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                            This action cannot be undone. This will permanently delete the
                            Agency account and all related sub accounts.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex items-center">
                        <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={deletingAgency}
                            className="bg-destructive hover:bg-destructive"
                            onClick={handleDeleteAgency}
                        >
                            Delete
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent> */}
                </CardContent>
            </Card>
        </AlertDialog>
    )
}  

export default OfficeDetails;