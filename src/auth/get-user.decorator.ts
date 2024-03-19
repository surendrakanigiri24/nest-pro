import { createParamDecorator } from "@nestjs/common";
import { User } from "./auth.entity";

export const GetUser = createParamDecorator((data, req): User => {
    console.log(req)
    return req.user
})