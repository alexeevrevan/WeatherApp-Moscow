import React, { useState, useCallback } from "react";
import Weather from "./components/Weather";
import VariableInput from "./components/VariableInput";
import { WeatherVariable } from "./hooks/useWeather";

const availableWeatherVariables: WeatherVariable[] = [
  "rain_sum",
  "snowfall_sum",
  "weathercode",
  "temperature_2m_max",
  "temperature_2m_min",
  "apparent_temperature_max",
  "apparent_temperature_min",
  "sunrise",
  "sunset",
  "precipitation_sum",
  "showers_sum",
  "precipitation_hours",
  "windspeed_10m_max",
  "windgusts_10m_max",
  "winddirection_10m_dominant",
  "shortwave_radiation_sum",
  "et0_fao_evapotranspiration",
];

function App() {
  const [variables, setVariables] = useState<WeatherVariable[]>([
    "rain_sum",
    "snowfall_sum",
  ]);

  const [error, setError] = useState<string>(""); // Обрабатываем ошибки

  const addVariable = useCallback(
    (newVariable: WeatherVariable) => {
      if (!variables.includes(newVariable)) {
        setVariables((prev) => [...prev, newVariable]);
        setError("");
      } else {
        setError("Эта переменная уже добавлена.");
      }
    },
    [variables]
  );

  const validateInput = useCallback((input: string) => {
    if (input.trim() === "") {
      // Проверка на пустую строку
      setError("Необходимо ввести значение"); // Устанавливаем сообщение об ошибке
      return false;
    }
    // Входит ли в список допустимых
    if (!availableWeatherVariables.includes(input as WeatherVariable)) {
      setError("Недопустимая переменная.");
      return false;
    }
    return true;
  }, []);

  return (
    <div>
      <VariableInput
        onAddVariable={addVariable}
        error={error}
        onInputValidation={validateInput}
      />
      <Weather
        latitude={55.751244}
        longitude={37.618423}
        variables={variables}
      />
    </div>
  );
}

export default App;
