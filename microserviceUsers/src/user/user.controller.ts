import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern(UserMSG.CREATE)
  // @ApiOperation({summary: 'Create user'})
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @MessagePattern(UserMSG.GET_ALL)
  getAll() {
    return this.userService.getAll();
  }

  @MessagePattern(UserMSG.GET_ONE)
  getOne(@Payload() id: string) {
    return this.userService.getOne(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.userDTO);
  }

  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() payload: any) {
    const user = await this.userService.findByUsername(payload.username);
    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );
    if (user && isValidPassword) return user;
    return null;
  }
}
