import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { HttpModule } from "./http/http.module";
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
