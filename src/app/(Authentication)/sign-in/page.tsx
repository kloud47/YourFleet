"use client"
import Link from "next/link";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"
import { ChevronLeft } from "lucide-react";
import GoogleButton from "react-google-button"
import { useState } from "react";


export default function () {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false)
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function handleSubmit (e: any) {
        e.preventDefault();

        console.log(email, password, name)
        try {
            await signIn("credentials", {
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
            <Button className="absolute top-0 left-0 m-5 group" variant={'outline'} onClick={() => router.back()}>
                <ChevronLeft size={30} className="group-hover:translate-x-[-5px] duration-200" />
                back
            </Button>
            <div className="h-[65vh] flex w-[60vw] bg-[#000] shadow-2xl">
                <div className="w-[50%] bg-secondary p-6">
                    <h1 className="font-black text-[#fff] text-3xl text-center border-b border-[#9d7b9c] pb-5">Sign in</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col pt-3">
                        <label htmlFor="email" className="pl-2">Email</label>
                        <input type="email" name="email" className=" outline-none opacity-50 z-10 p-1 text-[#fff] placeholder:text-slate-500 rounded-md mb-3 bg-muted"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            />

                        <label htmlFor="password" className="pl-2">Password</label>
                        <input type="password" name="password" className="outline-none opacity-50 rounded-md p-1 text-[#fff] placeholder:text-slate-500 mb-3 bg-muted"  
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />

                        <Button onClick={() => setisLoading(true)}>
                            {
                                isLoading ? "Loading..." : "Signin"
                            }
                        </Button>

                        <div className="my-4 text-center">or</div>

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
                    <div className="text-[#9e8faa] mt-8 text-center">
                        Already signed in?<Link href={"/sign-up"} className="text-[#6e98d8]">Signup</Link>
                    </div>
                    </form>
                </div>



                <div className="w-[50%] text-[#fff] bg-muted rounded-r-xl text-lg font-thin text-[30px] flex flex-col justify-center">
                    <div className="ml-10">
                        <h1 className="text-center">Fleet is waiting for you...</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}