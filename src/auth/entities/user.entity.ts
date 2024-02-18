import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string
  
  @Column()
  email: string
  
  @Column()
  picture: string
}

export default User