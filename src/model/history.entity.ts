import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  @Column()
  license_plate: string;
  
  @Column()
  province: string;

  @Column()
  brand: string;

  @Column()
  car_image: string;
  
  @Column()
  license_image: string;
}

export default History;
