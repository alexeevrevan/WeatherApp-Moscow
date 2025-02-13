import { useEffect, useState } from "react";
import { WeatherApiResponse, WeatherVariable } from "../types";


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
