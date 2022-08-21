import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import path from "node:path";
import { UserService } from "../services/user.service";

import { DatabaseModule } from "../database/database.module";
import { UsersResolver } from "../http/grapqhl/resolvers/users.resolver";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), "src/schema.gql"),
    }),
  ],
  providers: [UserService, UsersResolver],
})
export class HttpModule {}
