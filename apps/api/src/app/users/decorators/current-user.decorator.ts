import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): User | null => {
    const req = context.switchToHttp().getRequest();
    return req.currentUser;
  },
);
