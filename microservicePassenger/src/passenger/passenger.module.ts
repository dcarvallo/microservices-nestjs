import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PASSENGER } from "src/common/models";
import { PassengerSchema } from "./schema/passenger.schema";
import { PassengerController } from "./passenger.controller";
import { PassengerService } from "./passenger.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => {
          return PassengerSchema;
        },
      },
    ]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
