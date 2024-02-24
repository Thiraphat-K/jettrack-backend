import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import User, { UserRole } from "@src/model/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getAllUser(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export default UserService;
