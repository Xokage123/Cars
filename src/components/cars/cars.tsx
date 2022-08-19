import { ChangeEvent, FC, FormEventHandler, useState } from 'react';

import cn from 'classnames';

import {
  allCoordinates,
  CarsInformation,
  carsInitialInformation,
  colors,
  startWidth,
  startWidthZoom,
  TEST_DATA,
  widthCar,
} from './const';

import styles from './cars.module.scss';

const Cars: FC = () => {
  const [width, setWidth] = useState(startWidth);

  const [isZoom, setIsZoom] = useState(false);

  const [isStart, setIsStart] = useState(false);

  const [zoomWidth, setZoomWidth] = useState<undefined | number>(
    startWidthZoom,
  );

  const [carsInformation, setCarsInformation] = useState(
    carsInitialInformation,
  );

  const handleChangeCarCoordinate =
    (carPosition: number) => (coordinate: number) => () => {
      setCarsInformation((prevState) => {
        return {
          ...prevState,
          [`car_${carPosition}`]: {
            process: coordinate,
          },
        };
      });
    };

  const [numberCars, setNumberCars] = useState<undefined | number>(6);

  const [valueWidth, setValueWidth] = useState<undefined | number>(startWidth);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setValueWidth(+value === 0 ? undefined : +value);
  };

  const handleChangeNumberCars = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNumberCars(+value === 0 ? undefined : +value);
  };

  const handleSetWidthField: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (valueWidth && valueWidth >= startWidth && +valueWidth <= 1000) {
      setWidth(valueWidth);
    } else {
      setWidth(startWidth);

      setValueWidth(0);
    }
  };

  const handleChangeZoom = () => {
    setIsZoom((prevState) => !prevState);
  };

  const handleChangeZoomWidth = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setZoomWidth(+value === 0 ? undefined : +value);
  };

  const handleStart = () => {
    const { line, progress } = TEST_DATA;

    setIsStart(true);

    handleChangeCarCoordinate(line)(progress)();
  };

  const handleStop = () => {
    setIsStart(false);
  };

  const handleReset = () => {
    setCarsInformation(carsInitialInformation);
  };

  const handleGetZoomField = (carsInformation: CarsInformation) => {
    const values = Object.keys(carsInformation).map(
      (car) => carsInformation[car].process,
    );

    const minValue = Math.min(...values);

    const maxValue = Math.max(...values);

    const minWidth = ((width - widthCar) * minValue) / allCoordinates;

    const maxWidth = ((width - widthCar) * maxValue) / allCoordinates;

    const widthActual = maxWidth - minWidth + widthCar + 'px';

    return (
      <div
        className={styles.zoomField}
        style={{
          width: widthActual,
        }}
      />
    );
  };

  return (
    <section className={styles.container}>
      <div
        className={styles.field}
        style={{
          width: width + 'px',
        }}>
        <ul className={styles.cars}>
          {isZoom && handleGetZoomField(carsInformation)}

          {colors.map((color, index) => {
            const carInformation = carsInformation[`car_${index + 1}`];

            const { process } = carInformation;

            const widthPercent =
              ((width - widthCar) * process) / allCoordinates;

            return (
              <li className={styles.track} key={color}>
                <div
                  style={{
                    transform: `translateX(${widthPercent}px)`,
                  }}
                  className={styles.car}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <path
                      fill={color}
                      d="m93.6 49.1-17.2-5.8-8.5-15.6c-2.3-4.2-6.7-6.8-11.4-6.8h-31c-4.8 0-9.1 2.6-11.4 6.8L5.2 44v.1c-.1.1-.1.2-.1.3v24.5c0 1.1.9 2 2 2h8.2c.9 4.6 5 8 9.8 8s8.9-3.4 9.8-8h30.4c.9 4.6 5 8 9.8 8s8.9-3.4 9.8-8H93c1.1 0 2-.9 2-2V51c0-.9-.5-1.6-1.4-1.9zM38 25h18.5c3.3 0 6.3 1.8 7.9 4.7L71.6 43H38V25zm-20.4 4.7c1.6-2.9 4.6-4.7 7.9-4.7H34v18H10.4l7.2-13.3zM15.2 67H9v-4h8c-.9 1.2-1.5 2.5-1.8 4zm9.8 8c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm50 0c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm16-8h-6.2c-.9-4.6-5-8-9.8-8s-8.9 3.4-9.8 8H34.8c-.9-4.6-5-8-9.8-8H9V47h65.7L91 52.4V67z"
                    />
                  </svg>
                </div>

                <div className={styles.road}>
                  <div
                    style={{
                      width: widthPercent + widthCar + 'px',
                      backgroundColor: color,
                    }}
                    className={styles.distance}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <button onClick={handleStart} className={styles.button}>
          Play
        </button>

        <button onClick={handleStop} className={styles.button}>
          Stop
        </button>

        {!isStart && (
          <button onClick={handleReset} className={styles.button}>
            Reset
          </button>
        )}

        {!isStart && (
          <div className={styles.zoom}>
            <fieldset className={styles.fieldset}>
              <label className={styles.label} htmlFor="zoom">
                Zoom
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
                <p>Ширина Zoom</p>
                <p>(Min=200, Max=400)</p>
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

        <form className={styles.form} onSubmit={handleSetWidthField}>
          <label htmlFor="cars-field-width">
            <p>Выберите ширину поля</p>
            <p>(Min={startWidth}, Max=1000)</p>
          </label>

          <input
            className={styles.input}
            onChange={handleChangeValue}
            value={valueWidth}
            id="cars-field-width"
            type="number"
          />

          <label htmlFor="number-cars">
            <p>Выберите количество машинок</p>
            <p>(Min=1, Max=6)</p>
          </label>

          <input
            className={styles.input}
            onChange={handleChangeNumberCars}
            value={numberCars}
            id="number-cars"
            type="number"
          />

          <button className={styles.button} type="submit">
            Применить
          </button>
        </form>
      </div>
    </section>
  );
};

export default Cars;
