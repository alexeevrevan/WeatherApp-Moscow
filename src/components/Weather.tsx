import React from "react";
import useWeather from "../hooks/useWeather";
import { WeatherVariable } from "../types";
import { v4 as uuidv4 } from "uuid";

type Latitude = number;
type Longitude = number;

type Props = {
  latitude: Latitude;
  longitude: Longitude;
  variables: WeatherVariable[];
};

const Weather: React.FC<Props> = (props) => {
  const { weather, loading, error } = useWeather(
    props.latitude,
    props.longitude,
    props.variables
  );

  return (
    <>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {weather && (
        <table>
          <thead>
            <tr>
              <td>Date</td>
              {props.variables.map((variable) => (
                <td key={variable}>{variable}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {weather.daily.time.map((time, index) => {
              // Генерация уникального UUID для каждой строки
              const rowId = uuidv4();

              // Логирование UUID каждой строки
              console.log(`Row ${index} UUID:`, rowId);

              return (
                <tr key={rowId}>
                  <td>{time}</td>
                  {props.variables.map((variable) => {
                    // Генерация UUID для каждой ячейки
                    const cellId = uuidv4();


                    return (
                      <td key={cellId}>
                        {weather.daily[variable]?.[index] !== undefined
                          ? weather.daily[variable][index]
                          : "Нет данных"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Weather;
