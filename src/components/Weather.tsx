import React from "react";
import useWeather, { WeatherVariable } from "../hooks/useWeather";

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
            {weather.daily.time.map((time, index) => (
              <tr key={time}>
                <td>{time}</td>
                {props.variables.map((variable) => (
                  <td key={variable}>
                    {weather.daily[variable]?.[index] !== undefined
                      ? weather.daily[variable][index]
                      : "Нет данных"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Weather;
