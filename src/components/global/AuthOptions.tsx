"use client"
import { motion } from "framer-motion"
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
const data = [
    { title: "Collection Hub", description: "", link: "agency" },
    { title: "Deliver partner", description: "", link: "delivery-partner" },
    { title: "Post Offices", description: "", link: "postoffice" },
    { title: "Customer", description: "", link: "customer" },
];

const AuthOptions = ({ open, close }: {open: boolean, close: () => void}) => {
    const router = useRouter();

    return createPortal(
        <>
            <motion.div exit={{opacity: 0}} transition={{duration: 0.7}} className="h-full fixed w-screen  bg-gradient-to-b from-background to-background opacity-95 z-40 overflow-hidden"></motion.div>
            <motion.div onClick={close} className="fixed h-full w-full flex flex-col items-center justify-center z-50 p-10">
                <div className="flex justify-between w-[60vw] items-center my-5">
                    <div className="text-xl font-bold uppercase">Register</div>
                    <button
                        onClick={close}
                        className="place-self-end z-50"><X className="text-foreground font-extrabold hover:text-red-500 duration-300 hover:rotate-180" size={40} />
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-2 h-[60vh] w-[60vw] gap-2 z-50">
                    {data.map((card, i) => 
                        <motion.div onClick={() => router.push(`/${card.link}`)
                        }
                            className="relative duration-200 hover:bg-secondary bg-primary rounded-sm cursor-pointer shadow-lg h-full w-full flex flex-col items-center text-center justify-center text-[4vh] font-bold" 
                            key={i}
                            // drag="x"
                            initial={{opacity: 0, translateY: -10, translateX: 300}}
                            animate={{opacity: 100, translateY: 0, translateX: 0}}
                            transition={{ delay: i*0.2, ease: "easeOut"}}
                        >
                            <motion.h1 className="absolute text-white z-[50]"
                                initial={{opacity: 0}}
                                animate={{opacity: 100}}
                                transition={{delay: .8}}
                            >{card.title}</motion.h1>
                        </motion.div>
                    )}
                    {/* <HoverEffect items={data}/> */}
                </div>
            </motion.div>
        </>,
        document.querySelector('#portal')!
    )
}
export default AuthOptions;