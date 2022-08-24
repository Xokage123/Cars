import { CarsInformation } from './type';

export const colors = [
  '#0C4ABE',
  '#B5EB37',
  '#B7000D',
  '#DCC102',
  '#8022DF',
  '#9A9A81',
];

export const raceWidth = 450;

export const zoomWidths = {
  min: Math.round(raceWidth * 0.6),
  max: Math.round(raceWidth * 0.8),
};

export const widthCar = 50;

export const startWidthZoom = 200;

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
