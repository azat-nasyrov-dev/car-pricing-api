import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { USER_NOT_FOUND_ERROR } from './users.constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('Auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  public async createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return await this.authService.signup(body.email, body.password);
  }

  @Get()
  public async findAllUsers(
    @Query('email') email: string,
  ): Promise<UserEntity[]> {
    return await this.usersService.findListOfUsers(email);
  }

  @Get('/:id')
  public async findOneUser(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.usersService.findUserById(parseInt(id));

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return user;
  }

  @Delete('/:id')
  public async removeUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.removeUserById(parseInt(id));
  }

  @Patch('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.updateUserById(parseInt(id), body);
  }
}
