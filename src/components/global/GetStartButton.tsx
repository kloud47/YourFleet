import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
    setOpen: () => void
}

const GetStatrtedButton = ({ setOpen } : Props) => {
    const session = useSession();
    const user = session.data?.user

    if (user?.role == "AGENCY_OWNER") {
        return <Link href={`/agency`}>
                    <button className="button animate-slidein opacity-0 [--slidein-delay:900ms]">
                    Get Started
                    </button>
                </Link>
    }

    
    if (user?.role == "DELIVERY_PARTNER") {
        return <Link href={`/delivery-partner`}>
                    <button className="button animate-slidein opacity-0 [--slidein-delay:900ms]">
                    Get Started
                    </button>
                </Link>
    }
    

    return <Button 
                onClick={setOpen}
                className="button animate-slidein opacity-0 [--slidein-delay:900ms]">
                Get Started
            </Button>
}

export default GetStatrtedButton;