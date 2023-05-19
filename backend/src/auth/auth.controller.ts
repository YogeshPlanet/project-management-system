import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto): Promise<{ token: string }> {
    const token = await this.authService.signin(dto);
    return { token };
  }

  @Get('signout')
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req,res)
  }
}
