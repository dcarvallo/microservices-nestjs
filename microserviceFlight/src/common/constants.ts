export enum RabbitMQ {
  FlightQueue = "flights",
}

export enum FlightMSG {
  CREATE = 'CREATE_FLIGHT',
  GET_ALL = 'GET_FLIGHTS',
  GET_ONE = 'GET_FLIGHT',
  UPDATE = 'UPDATE_FLIGHT',
  DELETE = 'DELETE_FLIGHT',
  VALID_FLIGHT = 'VALID_FLIGHT',
  ADD_PASSENGER = 'ADD_PASSENGER',
}
