import { IsNotEmpty } from "class-validator";
import User from "../entities/user.entity";

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;
}
