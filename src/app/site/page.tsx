import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="w-full pt-36 flex flex-col items-center justify-center ">
        <div className="z-0 absolute bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#444649_1px,transparent_1px),linear-gradient(to_bottom,#444649_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <p className="tracking-wider font-medium text-[#cfcfcf]">Run your agency in one place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]"><span className="text-9xl">Your</span>Fleet</h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[70px]">
          {/* <Image 
            src={"/assets/preview.png"} width={1200} height={1200} alt="banner image" 
            className="rounded-t-2xl border-2 border-muted"
          /> */}
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center">Choose what fits your right</h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If {"you're"} not <br/>
          ready to commit you can get started for free.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
          
        </div>
      </section>
    </>
  );
}
