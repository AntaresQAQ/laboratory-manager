import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { CurrentUser } from '@/common/user.decorator';
import { UserEntity } from '@/user/user.entity';
import { ErrorMessage } from '@/common/exception';
import { NewApprovalRequestDto } from '@/approval/dto/new-approval-request.dto';
import { ApprovalService } from '@/approval/approval.service';
import { OneApprovalParamDto } from '@/approval/dto/one-approval-param.dto';
import { ApprovalRequestDto } from '@/approval/dto/approval-request.dto';

@Controller('approval')
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) {}

  @Get()
  @Render('approval/index')
  async approvalGet(@Query() query: ApprovalRequestDto) {
    const approvals = await this.approvalService.findApprovalsByStatus(query.status);
    return { approvals };
  }

  @Get('new')
  @Render('approval/new')
  async approvalNewGet(@CurrentUser() currentUser: UserEntity) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
  }

  @Post('new')
  @Redirect()
  async approvalNewPost(
    @CurrentUser() currentUser: UserEntity,
    @Body() body: NewApprovalRequestDto,
  ) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
    const price = Number(body.price);
    if (price <= 0) throw new ErrorMessage(400, '非法的价格');
    const amount = parseInt(body.amount);
    if (amount < 1) throw new ErrorMessage(400, '非法的数量');
    const approval = await this.approvalService.createApproval(
      currentUser,
      body.name,
      body.model,
      body.type,
      body.factory,
      price,
      amount,
    );
    return { url: `/approval/${approval.id}` };
  }

  @Get(':id')
  @Render('approval/one')
  async approvalOneGet(
    @CurrentUser() currentUser: UserEntity,
    @Param() param: OneApprovalParamDto,
  ) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
    const id = parseInt(param.id);
    const approval = await this.approvalService.findApprovalById(id);
    if (!approval) throw new ErrorMessage(404, '申请不存在');
    return {
      approval,
      person: await approval.person,
      acceptedPerson: await approval.acceptedPerson,
    };
  }

  @Get(':id/accept')
  @Redirect()
  async approvalAcceptGet(
    @CurrentUser() currentUser: UserEntity,
    @Param() param: OneApprovalParamDto,
  ) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
    if (!currentUser.isLeader) throw new ErrorMessage(403, '您没有权限');
    const id = parseInt(param.id);
    const approval = await this.approvalService.findApprovalById(id);
    if (!approval) throw new ErrorMessage(404, '申请不存在');
    if (!approval.isWaiting) throw new ErrorMessage(402, '错误的状态');
    await this.approvalService.acceptApproval(currentUser, approval);
    return { url: `/approval/${approval.id}` };
  }

  @Get(':id/refuse')
  @Redirect('/approval')
  async approvalRefuseGet(
    @CurrentUser() currentUser: UserEntity,
    @Param() param: OneApprovalParamDto,
  ) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
    if (!currentUser.isLeader) throw new ErrorMessage(403, '您没有权限');
    const id = parseInt(param.id);
    const approval = await this.approvalService.findApprovalById(id);
    if (!approval) throw new ErrorMessage(404, '申请不存在');
    if (!approval.isWaiting) throw new ErrorMessage(402, '错误的状态');
    await this.approvalService.refuseApproval(approval);
  }

  @Get(':id/finish')
  @Redirect()
  async approvalFinishGet(
    @CurrentUser() currentUser: UserEntity,
    @Param() param: OneApprovalParamDto,
  ) {
    if (!currentUser) throw new ErrorMessage(403, '请先登录');
    const id = parseInt(param.id);
    const approval = await this.approvalService.findApprovalById(id);
    if (!approval) throw new ErrorMessage(404, '申请不存在');
    if (!approval.isAccepted) throw new ErrorMessage(402, '错误的状态');
    await this.approvalService.finishApproval(currentUser, approval);
    return { url: `/approval/${approval.id}` };
  }
}
