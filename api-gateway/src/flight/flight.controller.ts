import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { FlightMSG, PassengerMSG } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxyFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';

@ApiTags('Flights')
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxyFlights) {}

  private _clientProxyFlights = this.clientProxy.clientProxyFlights();
  private _clientProxyPassengers = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.CREATE, flightDTO);
  }

  @Get()
  getAll(): Observable<IFlight[]> {
    return this._clientProxyFlights.send(FlightMSG.GET_ALL, '');
  }

  @Get(':id')
  getOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.GET_ONE, id);
  }

  @Put()
  update(
    @Param('id') id: string,
    @Body() flightDTO: FlightDTO,
  ): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.UPDATE, { id, flightDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlights.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this._clientProxyPassengers
      .send(PassengerMSG.GET_ONE, passengerId)
      .toPromise();
    if (!passenger)
      throw new HttpException('passenger not found', HttpStatus.NOT_FOUND);
    return this._clientProxyFlights.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
