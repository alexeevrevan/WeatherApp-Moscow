import React, { useEffect, useState } from "react";

type Latitude = number;
type Longitude = number;
export type WeatherVariable =
  | "time"
  | "weathercode"
  | "temperature_2m_max"
  | "temperature_2m_min"
  | "apparent_temperature_max"
  | "apparent_temperature_min"
  | "sunrise"
  | "sunset"
  | "precipitation_sum"
  | "rain_sum"
  | "showers_sum"
  | "snowfall_sum"
  | "precipitation_hours"
  | "windspeed_10m_max"
  | "windgusts_10m_max"
  | "winddirection_10m_dominant"
  | "shortwave_radiation_sum"
  | "et0_fao_evapotranspiration";

type Props = {
  latitude: Latitude;
  longitude: Longitude;
  variables: WeatherVariable[];
};

type DailyWeather = Record<WeatherVariable, number[] | string[]>;

type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: string[];
  daily: DailyWeather;
};

const Weather: React.FC<Props> = (props) => {
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);

  //Обновил fetch запрос, тк по ТЗ клиент должен получать данные
  //за последнюю неделю, а не на неделю вперед

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${
        props.latitude
      }&longitude=${props.longitude}&daily=${props.variables.join(
        ","
      )}&timezone=Europe/Moscow&past_days=7&forecast_days=0`
    )
      .then((resp) => resp.json())
      .then((data: WeatherApiResponse) => {
        console.log(data); // Посмотрим в каком виде апишка приходит
        setWeather(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных о погоде:", error);
      });
  }, [props.latitude, props.longitude, props.variables]);

  return (
    <>
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
          {weather &&
            weather.daily.time.map((time, index) => (
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
    </>
  );
};

export default Weather;
