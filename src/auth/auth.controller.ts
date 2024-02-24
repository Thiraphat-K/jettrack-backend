import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters } from "@nestjs/common";
import { GoogleRegisterDto } from "./dto/google-register.dto";
import AuthService from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import CatchAllExceptionFilter from "@src/common/exception/catchAllException.filter";

@Controller("auth")
class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post("google-register")
  // async googleRegister(@Body() input: GoogleRegisterDto) {
  //   return await this.authService.googleRegister(input);
  // }

  @Post("login")
  @UseFilters(CatchAllExceptionFilter)
  async login(@Body() input: LoginDto) {
    return await this.authService.login(input);
  }

  @Post("register")
  async register(@Body() input: RegisterDto) {
    return await this.authService.register(input);
  }

  @Get()
  async getAllUsers() {
    return await this.authService.getAllUser();
  }
}

export default AuthController;
