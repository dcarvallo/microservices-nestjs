import { HttpStatus, Injectable } from "@nestjs/common";
import { FlightDTO } from "./dto/flight.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FLIGHT } from "src/common/models";
import { IFlight } from "src/common/interfaces/flight.interface";
import axios from "axios";
import * as moment from "moment";
import { IWeather } from "src/common/interfaces/weather.interface";

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>
  ) {}

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  }

  async getAll(): Promise<IFlight[]> {
    return this.model.find().populate("passengers");
  }

  async getWeather(flightDTO: FlightDTO) {
    const dateformat = moment(flightDTO.flightDate).format("YYYY-MM-DD");
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: flightDTO.destinationCity, dt: dateformat },
      headers: {
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        "X-RapidAPI-Key": "68a798e911mshd5e854d7d3e3ca9p1b2c11jsn7709bb600864",
      },
    };

    let result;
    await axios
      .request(options)
      .then(function (response) {
        // console.log(response.data.forecast.forecastday[0].day);
        result = response.data.forecast.forecastday[0].day;
      })
      .catch(function (error) {
        console.error(error);
      });

    return result;
  }

  assign(
    { _id, pilot, airplane, destinationCity, flightDate, passengers }: IFlight,
    weather: IWeather
  ): IFlight {
    return Object.assign({
      _id,
      pilot,
      airplane,
      destinationCity,
      flightDate,
      passengers,
      weather,
    });
  }

  async getOne(id: string): Promise<IFlight> {
    let flight = await this.model.findById(id).populate("passengers");

    const weather = await this.getWeather(flight);
    return this.assign(flight, weather);
  }

  async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

  async delete(id: string) {
    try {
      await this.model.findByIdAndRemove(id);
      return { status: HttpStatus.OK, msg: "deleted" };
    } catch (error) {
      return { status: HttpStatus.CONFLICT, msg: "error" };
    }
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true }
      )
      .populate("passengers");
  }
}
