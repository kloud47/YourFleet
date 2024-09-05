import Image from 'next/image';
import React from 'react'
import UserProfile from './user';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { ModeToggle } from '@/components/global/mode-toggle';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Bell } from 'lucide-react';

type Props = {

}

const Infobar = async (props: Props) => {
    const session = await getServerSession(authOptions)

    return (
        <div className='bg-background border-b border-muted h-[64px] pl-[80px] lg:pl-[320px] flex items-center justify-between p-3'>
            <Link href={'/'} className="flex items-center">
                <Image src={"/logo.png"} width={40} height={40} alt="logo" />
                <span className="text-2xl font-extrabold italic">eet</span>
            </Link>
            <aside className="flex gap-2 items-center">
                    { !session?.user &&
                        (<Link href={'/sign-in'}
                            className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary shadow-lg"
                        >Login</Link>)
                    }
                    {/* <UserButton /> */}
                    {/* <div>
                        <div>{session.user.name}</div>
                    </div> */}
                    {session && <UserProfile />}
                    <Sheet>
                        <SheetTrigger>
                            <div className='rounded-full w-8 h-8 bg-primary flex items-center justify-center text-white'>
                                <Bell size={17} />
                            </div>
                        </SheetTrigger>
                    </Sheet>
                    <ModeToggle />
                </aside>
        </div>
    )
}
export default Infobar;