export enum RabbitMQ {
  UserQueue = 'users',
  PassengerQueue = 'passengers',
  FlightQueue = 'flights',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  GET_ALL = 'GET_ALL',
  GET_ONE = 'GET_ONE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  VALID_USER = 'VALID_USER',
}

export enum PassengerMSG {
  CREATE = 'CREATE_PASSENGER',
  GET_ALL = 'GET_ALL',
  GET_ONE = 'GET_ONE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  VALID_PASSENGER = 'VALID_PASSENGER',
}

export enum FlightMSG {
  CREATE = 'CREATE_FLIGHT',
  GET_ALL = 'GET_ALL',
  GET_ONE = 'GET_ONE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  VALID_FLIGHT = 'VALID_FLIGHT',
  ADD_PASSENGER = 'ADD_PASSENGER',
}
