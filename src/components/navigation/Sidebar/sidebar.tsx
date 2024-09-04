import { getAuthUserDetails } from "@/lib/queries"
import MenuOptions from "./Sidebar-menu"

type Props = {
    id: string
    type: 'agency' | 'subaccount'
}

const Sidebar = async ({ id, type }: Props) => {
    const user = await getAuthUserDetails()
    if (!user) return null
    if (!user.AgencyHub) return

    const details = type == "agency" ?
        user?.AgencyHub :
        user?.AgencyHub.Partner.find(subaccount => subaccount.id === id)

        console.log(details)
    

    const sidebarOpt =
        type === 'agency'
            ? user.AgencyHub.SidebarOption || []
            : user.AgencyHub.Partner.find(subaccount => subaccount.id === id)
                ?.SidebarOption || []

    const partners = user.AgencyHub.Partner.filter(partner => 
        user.Permissions.find(permission => 
            permission.partnerId === partner.id && permission.access)
        )


    return <>
        <MenuOptions
            defaultOpen={true}
            details={details}
            id={id}
            sidebarOpt={sidebarOpt}
            partners={partners}
            user={user}
        />
        {/* mobile nav*/}
        <MenuOptions
            details={details}
            id={id}
            sidebarOpt={sidebarOpt}
            partners={partners}
            user={user}
        />
    </>
}

export default Sidebar;