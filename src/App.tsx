import React, { useState, useCallback } from "react";
import Weather from "./components/Weather";
import VariableInput from "./components/VariableInput";
import { WeatherVariable } from "./types";
import { useVariableValidation } from "./hooks/useVariableValidation";

function App() {
  // Локальное состояние для хранения переменных инпута
  const [variables, setVariables] = useState<WeatherVariable[]>([
    "rain_sum",
    "snowfall_sum",
  ]);

  // Запускаем кастомный хук для проверки введенных значений
  const { validateInput, error, setError } = useVariableValidation();

  const addVariable = useCallback(
    (newVariable: WeatherVariable) => {
      if (!variables.includes(newVariable)) {
        setVariables((prev) => [...prev, newVariable]);
        setError(null);
      } else {
        // Можно оставить локальную логику специфичную для этого случая
        setError("Эта переменная уже добавлена.");
      }
    },
    
    [variables, setError]
  );

  const handleAddVariable = useCallback(
    (input: string) => {
      // Используем валидацию из хука
      if (validateInput(input)) {
        addVariable(input as WeatherVariable);
      }
    },
    [validateInput, addVariable]
  );

  return (
    <div className="main_wrapper">
      <VariableInput
        onAddVariable={handleAddVariable}
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
