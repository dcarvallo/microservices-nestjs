import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PassengerMSG } from "src/common/constants";
import { PassengerDTO } from "./dto/passenger.dto";
import { PassengerService } from "./passenger.service";

@Controller()
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}
  @MessagePattern(PassengerMSG.CREATE)
  create(@Payload() passengerDTO: PassengerDTO) {
    return this.passengerService.create(passengerDTO);
  }

  @MessagePattern(PassengerMSG.GET_ALL)
  getAll() {
    return this.passengerService.getAll();
  }

  @MessagePattern(PassengerMSG.GET_ONE)
  getOne(@Payload() id: string) {
    return this.passengerService.getOne(id);
  }

  @MessagePattern(PassengerMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.passengerService.update(payload.id, payload.passengerDTO);
  }

  @MessagePattern(PassengerMSG.DELETE)
  delete(@Payload() id: string) {
    return this.passengerService.delete(id);
  }
}
