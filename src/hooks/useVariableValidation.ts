import { useState, useCallback } from "react";
import { availableWeatherVariables } from "../constants/weather";
import { WeatherVariable } from "../types";

export const useVariableValidation = () => {
  const [error, setError] = useState<string | null>(null);

  const validateInput = useCallback((input: string) => {
    if (input.trim() === "") {
      setError("Необходимо ввести значение");
      return false;
    }

    if (!availableWeatherVariables.includes(input as WeatherVariable)) {
      setError("Недопустимая переменная.");
      return false;
    }

    setError(null);
    return true;
  }, []);

  return { validateInput, error, setError };
};
