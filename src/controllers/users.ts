import type { BodyContext } from "../types/context";
import type { StaffApplicationDtoType } from "../schemas/users/applications";
import DbApi from "../services/dbApi";

const userService = DbApi.getInstance().user()

export async function createStaffApplication( ctx: BodyContext<StaffApplicationDtoType> ) {
    const {user, staff} = ctx.request.body
    const newApplication = userService.create({
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