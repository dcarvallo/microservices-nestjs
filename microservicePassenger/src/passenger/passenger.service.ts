import { HttpStatus, Injectable } from "@nestjs/common";
import { PassengerDTO } from "./dto/passenger.dto";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PASSENGER } from "src/common/models";
import { IPassenger } from "src/common/interfaces/passenger.interfaces";

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>
  ) {}

  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDTO);
    return await newPassenger.save();
  }

  async getAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async getOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndRemove(id);
    return { status: HttpStatus.OK, msg: "deleted" };
  }
}
