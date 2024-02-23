import { Injectable, UnauthorizedException } from "@nestjs/common";
import User from "./entities/user.entity";
import { GoogleRegisterDto } from "./dto/google-register.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "./dto/login.dto";

@Injectable()
class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // async googleRegister(createDto: GoogleRegisterDto): Promise<User> {
  //   let user = await this.repository.findOneBy({ email: createDto.email });

  //   if (!user) {
  //     const { id, ...createDtoo } = createDto
  //     user = this.repository.create(createDtoo);
  //     await this.repository.save(user);
  //   }

  //   return user;
  // }

  async login(loginInput: LoginDto): Promise<User> {
    const user = await this.repository.findOneBy({ username: loginInput.username });

    if (!user) throw new Error("user is not exist");
    if (loginInput.password == user.password) return user;
    else throw new UnauthorizedException();
  }

  async register 

  async getAllUser(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export default AuthService;
