import { Data } from './type';

export const colors = [
  '#0C4ABE',
  '#B5EB37',
  '#B7000D',
  '#DCC102',
  '#8022DF',
  '#9A9A81',
];

export const allCoordinates = 900;

export const startWidth = 500;

export const widthCar = 50;

export const startWidthZoom = 200;

export interface CarInformation {
  process: number;
}

export type CarsInformation = {
  [k in string]: CarInformation;
};

export const carsInitialInformation: CarsInformation = {
  car_1: {
    process: 0,
  },
  car_2: {
    process: 0,
  },
  car_3: {
    process: 0,
  },
  car_4: {
    process: 0,
  },
  car_5: {
    process: 0,
  },
  car_6: {
    process: 0,
  },
};

export const TEST_DATA: Data = {
  rng_id: 1,
  game_id: 42,
  event_id: 3,
  kind: 'car_progress',
  line: 2,
  progress: 400,
};
