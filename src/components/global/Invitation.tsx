import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";


const Invitation = () => {
    return (
        <Drawer>
            <DrawerTrigger>Invitation</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle className="text-2xl">Invitations</DrawerTitle>
                </DrawerHeader>
                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Invite">
                            <CommandItem className="flex p-2 justify-between mb-2">
                                <div className="flex flex-col">
                                    Type1 - Name1
                                    <div className="text-sm text-[#8b8b8b]">2-12-24</div>
                                </div>
                                <Button variant={"default"}>Accept</Button>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                    </Command>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="secondary">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
export default Invitation;