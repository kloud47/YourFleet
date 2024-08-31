import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}