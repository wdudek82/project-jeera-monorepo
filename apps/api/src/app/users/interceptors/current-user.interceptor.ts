import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const { userId } = req.session || {};

    if (userId) {
      req.currentUser = await this.usersService.findOneById(userId);
    }

    return next.handle();
  }
}
