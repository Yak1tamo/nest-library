import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string): Promise<any> {
    const user = await this.UserModel.findById(id);
    if (user) {
      return user;
    }
    return null;
  }

  async addUser(user): Promise<UserDocument> | null {
    const available = await this.UserModel.findOne({ email: user.email });
    if (available) {
      return null;
    }
    const passwordHash = await bcrypt.hash(user.password, 10);
    const data = {
      email: user.email,
      password: passwordHash,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const newUser = new this.UserModel(data);
    return await newUser.save();
  }

  async login(user) {
    // const flag = bcrypt.compareSync(password, user.passwordHash)
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // createToken(payload: any) {
  //   return this.jwtService.sign(payload);
  // }
}
