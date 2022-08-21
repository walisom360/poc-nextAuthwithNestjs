import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "../database/prisma/prisma.service";

interface CreateUserParams {
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private authService: AuthService) {}

  listAllUsers() {
    return this.prisma.customer.findMany();
  }

  findUserByEmail(email: string) {
    return this.prisma.customer.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: CreateUserParams) {
    const { email } = data;

    const userAlreadyExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      const { access_token } = await this.authService.login(userAlreadyExists);

      return { ...userAlreadyExists, access_token };
    }

    const user = await this.prisma.customer.create({
      data: { ...data },
    });

    const userData = {
      email: user.email,
      sub: user.id,
    };

    const { access_token } = await this.authService.login(userData);

    return { ...user, access_token };
  }
}
