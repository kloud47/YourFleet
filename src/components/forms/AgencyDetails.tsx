"use client"
import { useToast } from "../ui/use-toast";
import { redirect, useRouter } from "next/navigation";
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
import { AgencyHub } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";

type Props = {
    data: Partial<AgencyHub>
}

const FormSchema = z.object({
    name: z.string().min(2, {message: 'Agency name must be atleast 2 chars.'}),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    pincode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
})

const AgencyDetails = ({ data }: Props) => {
    const session = useSession();
    const { toast } = useToast();
    const router = useRouter();
    const [deletingAgency, setDeletingAgency] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: data?.name,
            companyEmail: data?.companyEmail,
            companyPhone: data?.companyPhone,
            address: data?.address,
            city: data?.city,
            pincode: data?.pincode,
            state: data?.state,
            country: data?.country,
        },
    })
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data])

    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            let newUser;
            newUser = await initUser({ role: "AGENCY_OWNER" })
            if (!data?.id) {
                const response = await upsertAgency({
                    id: data?.id ? data.id : v4(),
                    address: values.address,
                    city: values.city,
                    companyPhone: values.companyPhone,
                    country: values.country,
                    name: values.name,
                    state: values.state,
                    pincode: values.pincode,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    companyEmail: values.companyEmail,
                })
                toast({
                    title: `Created Hub, ${values.name}`,
                })
                // console.log(session.data?.user.role);
                await signIn('credentials', { redirect: false });
                return redirect(`/agency/${response?.id}`);
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
                    <CardTitle className="text-4xl mb-2 font-bold text-foreground tracking-wide">Agency Hub Information</CardTitle>
                    <CardDescription>
                        Lets create an agency to help your operations. You can edit agency settings later from the agency settiings tab.
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
                                    <FormLabel>Agency Name</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="Your agency name"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="companyEmail"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>Agency Email</FormLabel>
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
                                name="companyPhone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>Agency Phone Number</FormLabel>
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
                                    <FormLabel>Address</FormLabel>
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
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>City</FormLabel>
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
                                name="pincode"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormLabel>Zipcpde</FormLabel>
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
                                        placeholder="Country"
                                        {...field}
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

export default AgencyDetails;