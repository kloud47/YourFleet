"use client"
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Back = () => {
    const router = useRouter();

    return (
        <Button className="absolute top-0 left-0 m-5 group" variant={'outline'} onClick={() => router.back()}>
                <ChevronLeft size={30} className="group-hover:translate-x-[-5px] duration-200" />
                back
        </Button>
    )
}
export default Back;