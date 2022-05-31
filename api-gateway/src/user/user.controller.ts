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
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxyFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyFlights) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
  }

  @Get()
  getAll(): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMSG.GET_ALL, ' ');
  }

  @Get(':id')
  getOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.GET_ONE, id);
  }

  @Put()
  update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }
}
