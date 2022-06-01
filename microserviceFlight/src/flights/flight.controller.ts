import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FlightMSG } from "src/common/constants";
import { FlightDTO } from "./dto/flight.dto";
import { FlightService } from "./flight.service";

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}
  @MessagePattern(FlightMSG.CREATE)
  create(@Payload() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }

  @MessagePattern(FlightMSG.GET_ALL)
  getAll() {
    return this.flightService.getAll();
  }

  @MessagePattern(FlightMSG.GET_ONE)
  getOne(@Payload() id: string) {
    return this.flightService.getOne(id);
  }

  @MessagePattern(FlightMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.flightService.update(payload.id, payload.flightDTO);
  }

  @MessagePattern(FlightMSG.DELETE)
  delete(@Payload() id: string) {
    return this.flightService.delete(id);
  }

  @MessagePattern(FlightMSG.ADD_PASSENGER)
  addPassenger(@Payload() payload: any) {
    console.log(payload);
    return this.flightService.addPassenger(
      payload.flightId,
      payload.passengerId
    );
  }
}
