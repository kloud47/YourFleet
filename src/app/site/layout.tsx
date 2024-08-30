import { Navbar } from "@/components/navigation/navbar"
import React from "react"
// import Providers from "../providers";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        // <Providers>
            <main className="h-full">
                <Navbar />
                {children}
            </main>
        // </Providers>
    )
} 

export default Layout;