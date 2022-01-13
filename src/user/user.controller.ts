import { Body, Controller, Get, Post, Redirect, Render, Session } from '@nestjs/common';
import { ErrorMessage } from '@/common/exception';
import { CurrentUser } from '@/common/user.decorator';
import { UserEntity, UserType } from '@/user/user.entity';
import { LoginRequestDto } from '@/user/dto/login-request.dto';
import { UserService } from '@/user/user.service';
import { ReqSession } from '@/common/types';
import { AddRequestDto } from '@/user/dto/add-request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Render('user/index')
  async userGet() {
    const users = await this.userService.findUsers();
    return {
      users,
    };
  }

  @Get('login')
  @Render('user/login')
  async loginGet(@CurrentUser() currentUser: UserEntity): Promise<void> {
    if (currentUser) {
      throw new ErrorMessage(403, '您已经登录');
    }
  }

  @Post('login')
  @Redirect('/')
  async loginPost(
    @CurrentUser() currentUser: UserEntity,
    @Body() body: LoginRequestDto,
    @Session() session: ReqSession,
  ): Promise<void> {
    const { username, password } = body;
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      throw new ErrorMessage(404, '用户不存在');
    }
    if (!(await this.userService.checkPassword(user, password))) {
      throw new ErrorMessage(403, '密码错误');
    }
    session.uid = user.id;
  }

  @Get('logout')
  @Redirect('/')
  async logoutGet(
    @CurrentUser() currentUser: UserEntity,
    @Session() session: ReqSession,
  ): Promise<void> {
    if (!currentUser) {
      throw new ErrorMessage(403, '您没有登录');
    }
    session.uid = null;
  }

  @Get('add')
  @Render('user/add')
  async addGet(@CurrentUser() currentUser: UserEntity) {
    if (!currentUser) throw new ErrorMessage(403, '您没有登录');
    if (!currentUser.isAdmin) throw new ErrorMessage(403, '您没有权限');
  }

  @Post('add')
  @Redirect('/user')
  async addPost(@CurrentUser() currentUser: UserEntity, @Body() body: AddRequestDto) {
    if (!currentUser) throw new ErrorMessage(403, '您没有登录');
    if (!currentUser.isAdmin) throw new ErrorMessage(403, '您没有权限');
    const user = await this.userService.findUserByUsername(body.username);
    if (user) throw new ErrorMessage(402, '用户名已存在');
    await this.userService.createUser(
      body.username,
      body.password,
      body.type as UserType,
    );
  }
}
