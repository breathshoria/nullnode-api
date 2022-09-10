import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateSubscriptionDto } from './dto/subscribe-projects.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@prisma/client';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response, Request } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';

interface UserRequest extends Request {
  user: {
    username: string;
    userId: number;
  };
  cookies: {
    refreshToken: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getUser')
  async getUser(@Req() req) {
    return this.userService.getUser(req.user.username);
  }

  @Post('signup')
  async registerUser(@Body() body: RegisterUserDto): Promise<User> {
    return this.userService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    return await this.userService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    return this.userService.logout(req.user.username);
  }

  @Post('refreshToken')
  async refreshToken(@Req() req: UserRequest, @Body() body: RefreshTokenDto) {
    const { refreshToken } = body;
    return await this.userService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  async subscribeProjects(
    @Body() body: UpdateSubscriptionDto,
    @Req() req,
  ): Promise<void> {
    return this.userService.subscribeProjects(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unsubscribe')
  async unsubscribeProjects(
    @Body() body: UpdateSubscriptionDto,
    @Req() req,
  ): Promise<void> {
    return this.userService.unsubscribeProjects(req.user.userId, body);
  }
}
