import { DailyWeather } from "./weather.types";


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