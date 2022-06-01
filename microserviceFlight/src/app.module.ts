import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FlightModule } from "./flights/flight.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development"],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
