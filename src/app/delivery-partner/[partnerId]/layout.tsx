import Infobar from "@/components/navigation/Navbar/Infobar"
import Sidebar from "@/components/navigation/Sidebar/sidebar"
import { redirect } from "next/navigation"
// import UnauthorizedPage from "../unauthorized/page"

type Props = {
    children: React.ReactNode
    params: { agencyId: string }
}

const Layout = async ({ children, params }: Props) => {
    // const agencyId = await verifyAndAcceptInvitaion()
    
    // if (!agencyId) return redirect('/agency')
    
    // if (!user) return redirect('/')
    
    // if (
    //     user.privateMetadata.role !== 'AGENCY_OWNER' &&
    //     user.privateMetadata.role !== 'AGENCY_ADMIN'
    // ) return <UnauthorizedPage/>

    // let allNoti : any = []
    // const notifications = await getNotificationAndUser(agencyId)
    // if (notifications) allNoti = notifications

    return <div className="h-screen overflow-hidden">
        <Sidebar 
            // id={params.agencyId}
            id={'6ea6250c-2c56-4abe-a548-44f7603b4107'}
            type="agency"
            />
        <div className="md: ">
            {/* <div className="absolute">Welcome to {params.agencyId}</div> */}
            <Infobar />
            <div className="relative">
                {children}
            </div>
            {/* <Infobar notification={allNoti} />
            <div className="relative">
                <BlurPage>
                </BlurPage>
            </div> */}
        </div>
    </div>
}

export default Layout;