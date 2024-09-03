'use client'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Command, CommandInput, CommandGroup, CommandItem, CommandList, CommandSeparator } from "../../ui/command"
import { Settings, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from '@/components/ui/button'

type Props = {}

const UserProfile = (props: Props) => {
    const session = useSession();
    const username = session.data?.user?.name
    return (
        <Popover>
            <PopoverTrigger className='font-medium flex items-center gap-2 bg-muted px-2 rounded-full shadow-lg py-1'>
                <div className="bg-primary flex items-center justify-center text-lg p-1 h-10 w-10 text-foreground rounded-full">{username?.substring(0, 2)}</div>
                <div>{username}</div>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder="Search.." />
                    <CommandList>
                        <CommandGroup heading="Profile">
                            <CommandItem><User size={16} />manage</CommandItem>
                            <CommandItem><Settings size={16} />Settings</CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup>
                            <Button 
                                variant={'outline'}
                                className='w-full'
                                onClick={() => signOut()}
                            >Signout</Button>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default UserProfile