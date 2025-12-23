import type { BodyContext } from "../types/context.js";
import type { StaffApplicationDtoType, StudentApplicationDtoType } from "../schemas/users/applications.js";
import DbApi from "../services/dbApi.js";

const userService = DbApi.getInstance().user()

export async function createStaffApplication( ctx: BodyContext<StaffApplicationDtoType> ) {
    const {user, staff} = ctx.request.body
    const newUser = await userService.create({
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
    ctx.body = newUser
}

export async function createStudentApplication( ctx: BodyContext<StudentApplicationDtoType> ) {
    const {user, student} = ctx.request.body
    const newUser = await userService.create({
        data: {
            ...user,
            studentProfile: {
                create: {
                    ...student
                }
            }
        },
        include: {
            studentProfile: true
        }
    })
    ctx.status = 201
    ctx.body = newUser
}