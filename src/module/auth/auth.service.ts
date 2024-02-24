import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import User, { UserRole } from "../../model/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async login(loginInput: LoginDto): Promise<User> {
    const user = await this.repository.findOneBy({ username: loginInput.username });

    if (!user) throw new HttpException("user is not exist", HttpStatus.BAD_REQUEST);
    if (loginInput.password == user.password) return user;
    else throw new UnauthorizedException();
  }

  async register(registerInput: RegisterDto): Promise<User> {
    const user = await this.repository.findOneBy({ username: registerInput.username });
    if (!user) {
      const newUser = await this.repository.create({
        username: registerInput.username,
        password: registerInput.password,
        role: UserRole.ADMIN,
      });
      await this.repository.save(newUser);
      return newUser;
    } else throw new HttpException("this user already Exist", HttpStatus.BAD_REQUEST);
  }
}

export default AuthService;
