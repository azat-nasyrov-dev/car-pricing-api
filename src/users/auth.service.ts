import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserEntity } from './entities/user.entity';
import {
  EMAIL_IN_USE_ERROR,
  PASSWORD_BAD_ERROR,
  USER_NOT_FOUND_ERROR,
} from './users.constants';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async signup(email: string, password: string): Promise<UserEntity> {
    const users = await this.usersService.findListOfUsers(email);

    if (users.length) {
      throw new BadRequestException(EMAIL_IN_USE_ERROR);
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return await this.usersService.createUser(email, result);
  }

  public async signin(email: string, password: string): Promise<UserEntity> {
    const [user] = await this.usersService.findListOfUsers(email);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException(PASSWORD_BAD_ERROR);
    }

    return user;
  }
}
