export enum Status {
  pending = 'Ожидаем начало заезда',
  start = 'Идет заезд',
  finish = 'Заезд завершился',
  all_finish = 'Все заезды прошли успешно!',
}

export interface CarInformation {
  process: number;
}

export type CarsInformation = {
  [k in string]: CarInformation;
};

export interface Position {
  line: number;
  position: number;
}

export interface Progress {
  line: number;
  progress: number;
}

export interface CarEvent {
  kind:
    | 'start'
    | 'start_expected'
    | 'race_start'
    | 'car_progress'
    | 'car_lap'
    | 'car_finish'
    | 'race_finish'
    | 'finish';
  lap?: number;
  line?: number;
  lap_ms?: number;
  race_ms?: number;
  game_id: number;
  datetime: string;
  tech_break_expected?: boolean;
  start_expected?: string;
  positions?: Position[];
  progress?: Progress[];
}

export interface Data {
  events: CarEvent[];
}
