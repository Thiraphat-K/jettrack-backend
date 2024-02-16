import { Module } from "@nestjs/common";

@Module({
  controllers: [AuthModule],
})
class AuthModule {}

export default AuthModule

