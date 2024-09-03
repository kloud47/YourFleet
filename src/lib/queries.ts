// deleteAgency, initUser, saveActivityLogsNotification, updateAgencyDetails, upsertAgency
"use server"
import { getServerSession } from "next-auth"
import authOptions from "./authOptions"
import { AgencyHub, User } from "@prisma/client"
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

