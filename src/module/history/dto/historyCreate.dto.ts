import { IsNotEmpty } from "class-validator";

export class GoogleRegisterDto {
  timestamp: Date;

  license_plate: string;
  
  province: string;

  brand: string;

  car_image: string;
  
  license_image: string;
}
