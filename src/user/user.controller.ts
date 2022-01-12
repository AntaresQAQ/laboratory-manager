import { Body, Controller, Get, Post, Redirect, Render, Session } from '@nestjs/common';
import { ErrorMessage } from '@/common/exception';
import { CurrentUser } from '@/common/user.decorator';
import { UserEntity, UserType } from '@/user/user.entity';
import { LoginRequestDto } from '@/user/dto/login-request.dto';
import { UserService } from '@/user/user.service';
import { ReqSession } from '@/common/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async getLogout(
    @CurrentUser() currentUser: UserEntity,
    @Session() session: ReqSession,
  ): Promise<void> {
    if (!currentUser) {
      throw new ErrorMessage(403, '您没有登录');
    }
    session.uid = null;
  }
}
