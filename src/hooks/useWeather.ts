import { useEffect, useState } from "react";

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

type DailyWeather = Record<WeatherVariable, number[] | string[]>;

export type WeatherApiResponse = {
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

const useWeather = (
  latitude: number,
  longitude: number,
  variables: WeatherVariable[]
) => {
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${variables.join(
            ","
          )}&timezone=Europe/Moscow&past_days=7&forecast_days=0`
        );

        if (!response.ok) {
          throw new Error("Ошибка сети!");
        }

        const data: WeatherApiResponse = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Произошла неизвестная ошибка");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude, variables]);

  return { weather, loading, error };
};

export default useWeather;
