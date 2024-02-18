import { Body, Controller, Get, Post } from "@nestjs/common";
import { GoogleRegisterDto } from "./dto/google-register.dto";
import AuthService from "./auth.service";

@Controller("user")
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("google-register")
  async googleRegister(@Body() input: GoogleRegisterDto) {
    return await this.authService.googleRegister(input);
  }

  @Get()
  async getAllUsers() {
    return await this.authService.getAllUser();
  }  
}

export default AuthController;
