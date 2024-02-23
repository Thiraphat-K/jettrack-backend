import { Body, Controller, Get, Post } from "@nestjs/common";
import { GoogleRegisterDto } from "./dto/google-register.dto";
import AuthService from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("google-register")
  async googleRegister(@Body() input: GoogleRegisterDto) {
    return await this.authService.googleRegister(input);
  }

  @Post("login")
  async login(@Body() input: LoginDto) {

  }

  @Get()
  async getAllUsers() {
    return await this.authService.getAllUser();
  }  
}

export default AuthController;
