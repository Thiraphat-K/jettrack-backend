import { Injectable } from "@nestjs/common";
import User from "./entities/user.entity";
import { GoogleRegisterDto } from "./dto/google-register.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async googleRegister(createDto: GoogleRegisterDto): Promise<User> {
    let user = await this.repository.findOneBy({ email: createDto.email });

    if (!user) {
      const { id, ...createDtoo } = createDto
      user = this.repository.create(createDtoo);
      await this.repository.save(user);
    }

    return user;
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export default AuthService;
