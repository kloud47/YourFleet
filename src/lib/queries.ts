// deleteAgency, initUser, saveActivityLogsNotification, updateAgencyDetails, upsertAgency
"use server"
import { getServerSession } from "next-auth"
import authOptions from "./authOptions"
import { AgencyHub, Invitation, Partner, Postoffice, User } from "@prisma/client"
import { db } from "./db"

export const initUser = async ( newUser: Partial<User> ) => {
    const session = await getServerSession(authOptions)
    const user = session.user
    if (!user) return

    const userData = await db.user.upsert({
        where: {
            email: user.email,
        },
        update: newUser,
        create: {
            id: user.id,
            email: user.email,
            name: `${user.name}`,
            role: newUser.role || "CUSTOMER",
        }
    })

    return userData;
}

export const upsertAgency = async (agencyHub: AgencyHub) => {
    if (!agencyHub.companyEmail) return null
    try {
        const agencyDetails = await db.agencyHub.upsert({
            where: {
                companyEmail: agencyHub.companyEmail,
            },
            update: agencyHub,
            create: {
            users: {
                connect: { email: agencyHub.companyEmail },
            },
            ...agencyHub,
            SidebarOption: {
                create: [
                    {
                        name: 'Dashboard',
                        icon: 'category',
                        link: `/agency/${agencyHub.id}`,
                    },
                    {
                        name: 'Partners',
                        icon: 'person',
                        link: `/agency/${agencyHub.id}/partners`,
                    },
                    {
                        name: 'Manage',
                        icon: 'clipboardIcon',
                        link: `/agency/${agencyHub.id}/manage`,
                    },
                    {
                        name: 'Settings',
                        icon: 'settings',
                        link: `/agency/${agencyHub.id}/settings`,
                    },
                    {
                        name: 'Team',
                        icon: 'shield',
                        link: `/agency/${agencyHub.id}/team`,
                    },
                    {
                        name: 'Offices',
                        icon: 'person',
                        link: `/agency/${agencyHub.id}/offices`,
                    },
                    // {
                    //     name: 'Offices',
                    //     icon: 'shield',
                    //     link: `/agency/${agencyHub.id}/team`,
                    // },
                ],
            },
            },
        })
        return agencyDetails
    } catch (error) {
    console.log(error)
    }
}

export const getAuthUserDetails = async () => {
    const session = await getServerSession(authOptions);
    const user = session.user;
    if (!user) return

    const userData = await db.user.findUnique({
        where: {
            email: user?.email ?? ""
        },
        include: {
            AgencyHub: {
                include: {
                    SidebarOption: true,
                    Partner: {
                        include: {
                            SidebarOption: true,
                        }
                    }
            }
            },
            Permissions: true
        }
    })

    return userData;
}

// export const upsertOffice = async (postoffice: Postoffice) => {
//     if (!postoffice.postofficeEmail) return null
//     try {
//         const officeDetails = await db.postoffice.upsert({
//             where: {
//                 postofficeEmail: postoffice.postofficeEmail
//             },
//             update: agencyHub,
//             create: {
//             users: {
//                 connect: { email: agencyHub.companyEmail },
//             },
//             ...agencyHub,
//             SidebarOption: {
//                 create: [
//                     {
//                         name: 'Dashboard',
//                         icon: 'category',
//                         link: `/agency/${agencyHub.id}`,
//                     },
//                     {
//                         name: 'Partners',
//                         icon: 'person',
//                         link: `/agency/${agencyHub.id}/partners`,
//                     },
//                     {
//                         name: 'Manage',
//                         icon: 'clipboardIcon',
//                         link: `/agency/${agencyHub.id}/manage`,
//                     },
//                     {
//                         name: 'Settings',
//                         icon: 'settings',
//                         link: `/agency/${agencyHub.id}/settings`,
//                     },
//                     {
//                         name: 'Team',
//                         icon: 'shield',
//                         link: `/agency/${agencyHub.id}/team`,
//                     },
//                     {
//                         name: 'Offices',
//                         icon: 'person',
//                         link: `/agency/${agencyHub.id}/offices`,
//                     },
//                     // {
//                     //     name: 'Offices',
//                     //     icon: 'shield',
//                     //     link: `/agency/${agencyHub.id}/team`,
//                     // },
//                 ],
//             },
//             },
//         })
//         return agencyDetails
//     } catch (error) {
//     console.log(error)
//     }
// }

export const createInvite = async (invite: Partial<Invitation>) => {
    // const session = await getServerSession(authOptions)
    const invitation = await db.invitation.create({
        data: {
            email: invite.email,
            agencyId: invite.agencyId,
            message: invite?.message,
            status: invite.status || "PENDING",
            role: invite.role || "DELIVERY_PARTNER"
        }
    })

    return invitation;
}

export const getInvite = async  () => {
    const  session = await getServerSession(authOptions)
    const invites = await db.invitation.findMany({
        where: {
            email: String(session?.user?.email)
        }
    })
    return invites;
}

export const getInviteId = async (partnerEmail: string) => {
    const HubId = await db.invitation.findFirst({
        where: {
            email: partnerEmail
        },
        select: {
            agencyId: true
        }
    })
    return HubId?.agencyId;
}

export const upsertPartner = async (partner: Partner) => {
    if (!partner.OfficeEmail) return null
    try {
        const partnerDetails = await db.partner.upsert({
            where: {
                OfficeEmail: partner.OfficeEmail
            },
            update: partner,
            create: {
            users: {
                connect: { email: partner.OfficeEmail },
            },
            ...partner,
            SidebarOption: {
                create: [
                    {
                        name: 'Dashboard',
                        icon: 'category',
                        link: `/agency/${partner.id}`,
                    },
                    {
                        name: 'Partners',
                        icon: 'person',
                        link: `/agency/${partner.id}/partners`,
                    },
                    {
                        name: 'Manage',
                        icon: 'clipboardIcon',
                        link: `/agency/${partner.id}/manage`,
                    },
                    {
                        name: 'Settings',
                        icon: 'settings',
                        link: `/agency/${partner.id}/settings`,
                    },
                    {
                        name: 'Team',
                        icon: 'shield',
                        link: `/agency/${partner.id}/team`,
                    },
                    {
                        name: 'Offices',
                        icon: 'person',
                        link: `/agency/${partner.id}/offices`,
                    },
                    // {
                    //     name: 'Offices',
                    //     icon: 'shield',
                    //     link: `/agency/${agencyHub.id}/team`,
                    // },
                ],
            },
            },
        })
        return partnerDetails
    } catch (error) {
    console.log(error)
    }
}