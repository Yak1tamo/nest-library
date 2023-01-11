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

  async createUser(user) {
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
    await newUser.save();
    return await this.login(newUser);
  }

  async loginUser(user) {
    const available = await this.UserModel.findOne({ email: user.email });
    if (!available) {
      return null;
    }
    const flag = bcrypt.compareSync(user.password, available.password);
    if (!flag) {
      return null;
    }
    return await this.login(available);
  }

  async login(user) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };
    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
