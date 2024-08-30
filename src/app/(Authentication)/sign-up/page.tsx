"use client"
import Link from "next/link";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"


export default function () {
    // const router = useRouter();
    // const [phone, setPhone] = useState<string>();
    // const [password, setPassword] = useState<string>();
    // const [error, setError] = useState<string>();

    // async function handleSubmit (e: any) {
    //     e.preventDefault();

    //     console.log(phone, password, name)
    //     try {
    //         await signIn("credentials", {
    //             phone,
    //             password,
    //             redirect: false
    //         })
    //         router.push("/")
    //     } catch (e) {
    //         setError("In valid credentials")
    //     }
    // }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="h-[65vh] flex w-[60vw] bg-[#000] rounded-xl shadow-2xl">
                <div className="w-[50%] bg-[#3c3146] rounded-l-xl p-6">
                    <h1 className="font-black text-[#fff] text-3xl text-center border-b border-[#9d7b9c] pb-5">Sign in</h1>
                    <form  className="flex flex-col pt-3">
                        <label htmlFor="phone" className="pl-2 text-purple-300">Phone</label>
                        <input type="number" name="phone" className=" outline-none opacity-50 z-10 p-1 text-[#fff] placeholder:text-slate-500 rounded-md mb-3 bg-[#53455f]"
                            // onChange={(e) => setPhone(e.target.value)}
                            // value={phone}
                            // required
                            />

                        <label htmlFor="password" className="pl-2 text-purple-300">Password</label>
                        <input type="password" name="password" className="outline-none opacity-50 rounded-md p-1 text-[#fff] placeholder:text-slate-500 mb-3 bg-[#53455f]"  
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                // required
                                />

                        <Button disabled={true}>Signin</Button>

                        <Button onClick={() => signIn('google')}>Sign in whith google</Button>
                    <div className="text-[#9e8faa] mt-8 text-center">
                        Already signed in?<Link href={"/signup"} className="text-[#6e98d8]">Signup</Link>
                    </div>
                    </form>
                </div>



                <div className="w-[50%] text-[#fff] italic bg-muted rounded-r-xl font-black text-[30px] flex flex-col justify-center">
                    <div className="ml-10">
                    <h1>Welcome back</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}