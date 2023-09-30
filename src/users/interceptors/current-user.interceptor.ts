import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { USER_NOT_FOUND_ERROR } from '../users.constants';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  public async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      request.currentUser = await this.usersService.findUserById(userId);
    }

    if (!userId) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return handler.handle();
  }
}
