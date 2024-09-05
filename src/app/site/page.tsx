"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AuthOptions from "@/components/global/AuthOptions";


export default function Home() {
  const session = useSession();
  console.log(session.data)
  const [open, setOpen] = useState(false)


  return (
    <>
      {open && <AuthOptions open={open} close={() => setOpen(false)} />}
      <section className="w-full pt-36 flex flex-col items-center justify-center ">
        <div className="z-0 absolute bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#444649_1px,transparent_1px),linear-gradient(to_bottom,#444649_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        {/* <div>{JSON.stringify(session)}</div> */}
        <p
          className="tracking-wider font-medium text-[#7c7d7d] text-xl
            animate-slidein opacity-0 [--slidein-delay:300ms] flex items-center"
        >
          Join us & manage
          <ChevronRight />
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative animate-slidein opacity-0 [--slidein-delay:500ms]">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            <span className="text-9xl">Your</span>Fleet
          </h1>
        </div>
        <p className="tracking-wider font-medium text-[#8c8e8d] animate-slidein opacity-0 [--slidein-delay:700ms]">
          in one place
        </p>
        <div className="flex justify-center items-center relative md:mt-[70px]">
          {!session.data?.user ? 
            <Link href={`sign-in`}>
              <button className="button animate-slidein opacity-0 [--slidein-delay:900ms]">
                Get Started
              </button>
            </Link> 
            :
            <Button 
              onClick={() => setOpen(true) }
              className="button animate-slidein opacity-0 [--slidein-delay:900ms]">
                Get Started
            </Button>
            }
          {/* <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div> */}
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        Footer section working
      </section>
    </>
  );
}
