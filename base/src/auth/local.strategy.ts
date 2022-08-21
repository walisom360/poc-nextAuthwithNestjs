import * as dotenv from "dotenv";
dotenv.config();

import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: `${process.env.TOKEN_SECRET}`,
    });
  }
}
