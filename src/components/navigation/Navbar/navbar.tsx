// import { ModeToggle } from "@/components/global/mode-toggle"
import Image from "next/image"
import Link from "next/link"
import { HoverBorderGradient } from "../../utils/hover-border-gradient"
import { ModeToggle } from "../../global/mode-toggle"
import { Button } from "../../ui/button"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/authOptions"
import UserProfile from "./user"
import { getInvite } from "@/lib/queries"

type Props = {
    users?: null 
    // | User
}

export const Navbar = async ({ users }: Props) => {
    const session = await getServerSession(authOptions)

    const InviteData = await getInvite();
    // console.log(InviteData);

    return (
            <div className="p-4 flex items-center justify-between relative z-30">
                <aside className="flex items-center">
                    <Image src={"/logo.png"} width={40} height={40} alt="logo" />
                    <span className="text-2xl font-extrabold italic">eet</span>
                </aside>
                <HoverBorderGradient
                    containerClassName="rounded-full border-2"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
                    <ul className="flex items-center justify-center gap-8 font-medium uppercase">
                        <Link className="hover:text-primary duration-150" href={"#"}>Pricing</Link>
                        <Link className="hover:text-primary duration-150" href={"#"}>About</Link>
                        <Link className="hover:text-primary duration-150" href={"#"}>Features</Link>
                        <Link className="hover:text-primary duration-150" href={"#"}>Team</Link>
                    </ul>
                </HoverBorderGradient>
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
                    {session && <UserProfile inviteData={InviteData} />}
                    <ModeToggle />
                </aside>
            </div>
    )
}