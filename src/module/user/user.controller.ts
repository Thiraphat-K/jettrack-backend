import { Controller, Get } from "@nestjs/common";
import UserService from "./user.service";
import User from "@src/model/user.entity";

@Controller("user")
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUser();
  }
}

export default UserController;
