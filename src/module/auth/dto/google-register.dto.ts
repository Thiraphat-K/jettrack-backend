import { IsNotEmpty } from "class-validator";

export class GoogleRegisterDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  picture: string;
}
