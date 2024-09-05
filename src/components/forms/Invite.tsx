'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { v4 } from 'uuid'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { AgencyHub, Partner } from '@prisma/client'
import { useToast } from '../ui/use-toast'
import { useEffect } from 'react'
import Loading from '../global/Loading'
import { createInvite } from '@/lib/queries'


const formSchema = z.object({
    email: z.string(),
    message: z.string()
})


interface PartnerDetailsProps {
    agencyDetails?: AgencyHub
    details?: Partial<Partner>
    userId: string
}

const InviteModal: React.FC<PartnerDetailsProps> = ({
    details,
    agencyDetails,
    userId,
}) => {
    const { toast } = useToast()
    // const { setClose } = useModal()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: details?.OfficeEmail,
            // message: details?.message,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("ok")
        try {
        const response = await createInvite({
            id: details?.id ? details.id : v4(),
            // name: values.name,
            agencyId: agencyDetails?.id,
            email: values.email
        })
        toast({
            title: 'Invite Sent',
            description: 'Successfully sent invite.',
        })

        return response;
        // setClose()
        // router.refresh()
        // } catch (error) {
        //     toast({
        //         variant: 'destructive',
        //         title: 'Oppse!',
        //         description: 'Could not save sub account details.',
        //     })
        }catch(error: unknown) {
            console.log(error)
            toast({
                variant: 'destructive',
                title: 'Oppse!',
                description: 'Could not save sub account details.',
            })
        }
    }

    useEffect(() => {
        if (details) {
        form.reset(details)
        }
    }, [details])

    const isLoading = form.formState.isSubmitting
    //CHALLENGE Create this form.
    return (
        <Card className="w-full">
        <CardHeader>
            <CardDescription>Please enter details</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="flex md:flex-row gap-4">
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input
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
                    name="message"
                    render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Your message"
                            required
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <Button
                className='w-full rounded-lg'
                type="submit"
                // disabled={isLoading}
                >
                {isLoading ? <Loading /> : 'Send Invite'}
                </Button>
            </form>
            </Form>
        </CardContent>
        </Card>
    )
}

export default InviteModal;