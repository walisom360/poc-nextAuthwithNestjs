import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/local-auth.guards";
import { UserService } from "../../../services/user.service";
import { CreateUserInput } from "../inputs/create-user-input";
import { User } from "../models/user";

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UserService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  users() {
    return this.usersService.listAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args("data") data: CreateUserInput) {
    return this.usersService.createUser(data);
  }
}
