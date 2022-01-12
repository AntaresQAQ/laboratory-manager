import { Controller, Get, Render } from '@nestjs/common';
import { ErrorMessage } from '@/common/exception';
import { CurrentUser } from '@/common/user.decorator';
import { UserEntity } from '@/user/user.entity';

@Controller('user')
export class UserController {
  @Get('login')
  @Render('login')
  async login(@CurrentUser() currentUser: UserEntity): Promise<void> {
    if (currentUser) {
      throw new ErrorMessage(403, '您已经登陆');
    }
  }
}
