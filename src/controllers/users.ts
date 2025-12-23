import type { BodyContext } from "../types/context.js";
import type { StaffApplicationDtoType } from "../schemas/users/applications.js";
import DbApi from "../services/dbApi.js";

const userService = DbApi.getInstance().user()

export async function createStaffApplication( ctx: BodyContext<StaffApplicationDtoType> ) {
    const {user, staff} = ctx.request.body
    
    console.log('Creating staff application with data:', JSON.stringify({ user, staff }, null, 2))
    
    try {
        const newApplication = await userService.create({
            data: {
                ...user,
                auth0Id: null, // Explicitly set to null for applications without Auth0 yet
                staffProfile: {
                    create: {
                        ...staff
                    }
                }
            },
            include: {
                staffProfile: true
            }
        })
        ctx.status = 201
        ctx.body = newApplication
    } catch (error) {
        console.error('Prisma error details:', error)
        throw error
    }
}