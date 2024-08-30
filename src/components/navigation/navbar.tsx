// import { ModeToggle } from "@/components/global/mode-toggle"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { HoverBorderGradient } from "../utils/hover-border-gradient"
import { ModeToggle } from "../global/mode-toggle"

type Props = {
    users?: null | User
}

export const Navbar = ({ users }: Props) => {
    return (
            <div className="p-4 flex items-center justify-between relative z-40">
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
                    <Link href={"/agency"}
                        className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary shadow-lg"
                    >Login</Link>
                    {/* <UserButton /> */}
                    <ModeToggle />
                </aside>
            </div>
    )
}