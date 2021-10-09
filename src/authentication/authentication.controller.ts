import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LocalGuard } from './guards/local.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/authenticate')
  @UseGuards(JwtGuard)
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Post('/login')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { id, username } = request.user;
    const token = await this.authenticationService.login(id, username);
    response.setHeader('Authentication', token);
    response.send(request.user);
  }

  @Post('/signup')
  register(@Body() registerDto: RegisterDto) {
    return this.authenticationService.register(registerDto);
  }
}
