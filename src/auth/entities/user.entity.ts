import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum UserRole {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: string;
}

export default User;
