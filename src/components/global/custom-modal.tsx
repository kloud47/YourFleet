import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { PlusCircleIcon } from 'lucide-react'

type Props = {
    title: string
    subheading: string
    children: React.ReactNode
    defaultOpen?: boolean
}

const CustomModal = ({ title, subheading, children, defaultOpen }: Props) => {

    return (
        <Dialog>
            <DialogTrigger className='flex mx-auto gap-2 items-center bg-primary p-2 rounded-lg'>
                <PlusCircleIcon size={15} />
                Invite Delivery Partner
            </DialogTrigger>
            <DialogContent className='md:max-h-[700px] md:h-fit h-screen bg-card'>
                <DialogHeader className='pt-8 text-left'>
                    <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
                    <DialogDescription>{subheading}</DialogDescription>
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default CustomModal;