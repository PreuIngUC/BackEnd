import type { BodyContext } from "../types/context.js";
import type { StaffApplicationDtoType } from "../schemas/users/applications.js";
import DbApi from "../services/dbApi.js";

const userService = DbApi.getInstance().user()

export async function createStaffApplication( ctx: BodyContext<StaffApplicationDtoType> ) {
    const {user, staff} = ctx.request.body
    const newApplication = await userService.create({
        data: {
            ...user,
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
}