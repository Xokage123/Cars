import { ChangeEvent, CSSProperties, FC, useState } from 'react';

import cn from 'classnames';

import {
  carsInitialInformation,
  colors,
  raceWidth,
  startWidthZoom,
  widthCar,
  zoomWidths,
} from './const';
import TEST_DATA from './data.json';
import { Data, Progress, Status } from './type';

import styles from './cars.module.scss';

let clearToken: null | ReturnType<typeof setInterval> = null;

let count = 0;

const Cars: FC = () => {
  const [zoomWidth, setZoomWidth] = useState(startWidthZoom);

  const [status, setStatus] = useState(Status.pending);

  const [idRace, setIdRace] = useState(0);

  const [lap, setLap] = useState(0);

  const [isZoom, setIsZoom] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const [carsInformation, setCarsInformation] = useState(
    carsInitialInformation,
  );

  const setNewProgressCar = (progress?: Progress[]) => {
    if (progress) {
      setCarsInformation((prevState) => {
        const copyProgress = { ...prevState };

        progress.forEach((element) => {
          const { line, progress } = element;

          copyProgress[`car_${line}`] = {
            process: progress,
          };
        });

        return copyProgress;
      });
    }
  };

  const handleChangeZoom = () => {
    setIsZoom((prevState) => !prevState);
  };

  const handleChangeZoomWidth = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setZoomWidth(+value);
  };

  const handleStart = () => {
    const { events } = TEST_DATA as Data;

    setIsStart(true);

    if (clearToken) {
      clearInterval(clearToken);
    }

    clearToken = setInterval(() => {
      if (count >= events.length && clearToken) {
        clearInterval(clearToken);

        setStatus(Status.all_finish);

        return;
      }

      const { progress, kind, game_id, lap = 0 } = events[count];

      setNewProgressCar(progress);

      switch (kind) {
        case 'race_start':
          setLap(1);

          setStatus(Status.start);

          setIdRace(game_id);

          break;
        case 'car_lap':
          setLap(lap);

          count += 1;

          const { progress } = events[count];

          setNewProgressCar(progress);

          break;
        case 'finish':
          setStatus(Status.finish);

          setCarsInformation(carsInitialInformation);

          break;
      }

      count += 1;
    }, 1000);
  };

  const handleStop = () => {
    if (clearToken) {
      clearInterval(clearToken);
    }

    setIsStart(false);
  };

  const handleReset = () => {
    count = 0;

    setIdRace(0);

    setLap(0);

    setStatus(Status.pending);

    setCarsInformation(carsInitialInformation);
  };

  const styleRace: CSSProperties = {
    width: raceWidth,
  };
  const styleZoom: CSSProperties = {
    width: zoomWidth,
  };

  const isShowLapTitle =
    status !== Status.all_finish && status !== Status.pending;

  const isButtonStartDisabled =
    isZoom && (zoomWidth < zoomWidths.min || zoomWidth > zoomWidths.max);

  const getCar = (color: string) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path
        fill={color}
        d="m93.6 49.1-17.2-5.8-8.5-15.6c-2.3-4.2-6.7-6.8-11.4-6.8h-31c-4.8 0-9.1 2.6-11.4 6.8L5.2 44v.1c-.1.1-.1.2-.1.3v24.5c0 1.1.9 2 2 2h8.2c.9 4.6 5 8 9.8 8s8.9-3.4 9.8-8h30.4c.9 4.6 5 8 9.8 8s8.9-3.4 9.8-8H93c1.1 0 2-.9 2-2V51c0-.9-.5-1.6-1.4-1.9zM38 25h18.5c3.3 0 6.3 1.8 7.9 4.7L71.6 43H38V25zm-20.4 4.7c1.6-2.9 4.6-4.7 7.9-4.7H34v18H10.4l7.2-13.3zM15.2 67H9v-4h8c-.9 1.2-1.5 2.5-1.8 4zm9.8 8c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm50 0c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm16-8h-6.2c-.9-4.6-5-8-9.8-8s-8.9 3.4-9.8 8H34.8c-.9-4.6-5-8-9.8-8H9V47h65.7L91 52.4V67z"
      />
    </svg>
  );

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Статус: {status}</h2>

        {isShowLapTitle && (
          <>
            <h2>ID заезда: {idRace}</h2>

            <h2>Круг: {lap}</h2>
          </>
        )}
      </div>

      <div className={styles.field} style={styleRace}>
        <ul className={styles.cars}>
          {isZoom && <div className={styles.zoomField} style={styleZoom} />}

          {colors.map((color, index) => {
            const carInformation = carsInformation[`car_${index + 1}`];

            const { process } = carInformation;

            const width = isZoom ? zoomWidth : raceWidth;

            let actualWidth = ((width - widthCar) * process) / 100;

            if (isZoom) {
              const values = Object.keys(carsInformation).map(
                (key) => carsInformation[key].process,
              );

              const maxValue = Math.max(...values);
              const minValue = Math.min(...values);

              if (process !== 0) {
                if (process === maxValue) {
                  actualWidth = ((width - widthCar) * 100) / 100;
                }

                if (process === minValue) {
                  actualWidth = 0;
                }
              }
            }

            const styleCar: CSSProperties = {
              transform: `translateX(${actualWidth}px)`,
            };

            const styleDistance: CSSProperties = {
              width: actualWidth + widthCar + 'px',
              backgroundColor: color,
            };

            return (
              <li className={styles.track} key={color}>
                <div style={styleCar} className={styles.car}>
                  {getCar(color)}
                </div>

                <div className={styles.road}>
                  <div style={styleDistance} className={styles.distance} />
                </div>
              </li>
            );
          })}
        </ul>

        {!isStart && (
          <button
            disabled={isButtonStartDisabled}
            onClick={handleStart}
            className={styles.button}>
            Play
          </button>
        )}

        <button onClick={handleStop} className={styles.button}>
          Stop
        </button>

        {!isStart && (
          <button onClick={handleReset} className={styles.button}>
            Reset
          </button>
        )}

        {!isStart && (
          <div className={styles.form}>
            <fieldset className={styles.fieldset}>
              <label className={styles.label} htmlFor="zoom">
                Влючить Zoom-эффект
              </label>

              <input
                className={cn(styles.input)}
                onChange={handleChangeZoom}
                checked={isZoom}
                id="zoom"
                type="checkbox"
              />
            </fieldset>

            <fieldset className={styles.fieldset}>
              <label className={styles.label} htmlFor="zoom-width">
                <p>Ширина Zoom-эффекта</p>
                <p>
                  (Min={zoomWidths.min}, Max={zoomWidths.max})
                </p>
              </label>

              <input
                className={cn(styles.input)}
                onChange={handleChangeZoomWidth}
                value={zoomWidth}
                id="zoom-width"
                type="number"
              />
            </fieldset>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cars;
