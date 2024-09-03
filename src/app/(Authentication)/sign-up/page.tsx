"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"
import { ChevronLeft } from "lucide-react";
import GoogleButton from "react-google-button"
import { useState } from "react";
import Back from "@/components/navigation/backButton";


export default function () {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function handleSubmit (e: any) {
        e.preventDefault();

        console.log(email, password, name)
        try {
            await signIn("credentials", {
                name,
                email,
                password,
                redirect: false
            })
            router.push("/")
        } catch (e) {
            setError("In valid credentials")
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Back />
            <div className=" flex w-[60vw] bg-background shadow-2xl">
                <div className="w-[50%] bg-secondary p-6">
                    <h1 className="font-black text-primary text-3xl text-center border-b border-foreground pb-5">Sign up</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col pt-3">
                        <label htmlFor="name" className="pl-2">Name</label>
                        <input type="text" name="name" className=" outline-none opacity-50 z-10 p-1 text-foreground placeholder:text-slate-800 rounded-md mb-3 dark:bg-muted bg-background"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name..."
                            value={name}
                            required
                            />
                        
                        <label htmlFor="email" className="pl-2">Email</label>
                        <input type="email" name="email" className=" outline-none opacity-50 z-10 p-1 text-foreground placeholder:text-slate-800 rounded-md mb-3 dark:bg-muted bg-background"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email..."
                            value={email}
                            required
                            />

                        <label htmlFor="password" className="pl-2">Password</label>
                        <input type="password" name="password" className="outline-none opacity-50 rounded-md p-1 text-foreground placeholder:text-slate-800 mb-3 dark:bg-muted bg-background"  
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password..."
                                value={password}
                                required
                                />

                        <Button onClick={() => setisLoading(true)}>
                            {
                                isLoading ? "Loading..." : "Signup"
                            }
                        </Button>
                        {/* <Button>Signup</Button> */}

                        {/* <div className="my-4 text-center">or</div> */}
                        <div className="flex items-center justify-center my-4">
                            <div className="w-1/4 border-t border-gray-500"></div>
                                <span className="mx-3 text-gray-500">or</span>
                            <div className="w-1/4 border-t border-gray-500"></div>
                        </div>

                        <div className="mx-auto">
                            <GoogleButton 
                                label={isLoading ? "Loading..." : "Sign in with Google"}
                                disabled={isLoading} type="dark" 
                                onClick={() => {
                                    setisLoading(true)
                                    signIn('google')
                            }} 
                            />
                        </div>

                        {/* < onClick={() => signIn('google')} /> */}
                    <div className="text-muted-foreground mt-8 text-center">
                        Already signed in?<Link href={"/sign-in"} className="text-[#4285F4] font-bold">Signin</Link>
                    </div>
                    </form>
                </div>



                <div className="w-[50%] text-muted-foreground bg-muted rounded-r-xl text-lg font-thin text-[30px] flex flex-col justify-center">
                    <div className="flex items-center justify-center text-[#fff] font-bold italic text-2xl rounded-r-lg BGFleet w-full h-full">
                        <h1 className="text-center">Fleet is waiting for you...</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}