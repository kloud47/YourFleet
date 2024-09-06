import AgencyDetails from "@/components/forms/AgencyDetails";
import Back from "@/components/navigation/backButton";
import { Toaster } from "@/components/ui/toaster";
import authOptions from "@/lib/authOptions";
import { getAgency } from "@/lib/queries";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AgencyPage = async () => {
    const session = await getServerSession(authOptions)

    const agencyId = await getAgency( session?.user?.email )
    if (agencyId) {
        return redirect(`/agency/${agencyId.agencyId}`)
    }

    return (
        <div className="flex justify-center items-center w-full">
            <Back />
            <AgencyDetails data={{ companyEmail: String(session?.user?.email) }} />
            <Toaster />
        </div>
    )
}
export default AgencyPage;