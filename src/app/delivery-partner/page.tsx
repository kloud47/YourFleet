import AgencyDetails from "@/components/forms/AgencyDetails";
import PartnerDetails from "@/components/forms/PartnerDetails";
import Back from "@/components/navigation/backButton";
import { Toaster } from "@/components/ui/toaster";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const AgencyPage = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex justify-center items-center w-full">
            <Back />
            <PartnerDetails data={{ companyEmail: session.user.email }} />
            <Toaster />
        </div>
    )
}
export default AgencyPage;