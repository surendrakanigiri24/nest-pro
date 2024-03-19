import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./auth.entity";

export const GetUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user; // Assuming that user information is stored in the 'user' property of the request object
});
