/* eslint-disable react/prop-types */

import React, { useRef } from "react";
import { WeatherVariable } from "../types";

interface VariableInputProps {
  onAddVariable: (variable: WeatherVariable) => void;
  error: string | null;
  onInputValidation: (input: string) => boolean;
}

const VariableInput: React.FC<VariableInputProps> = React.memo(
  ({ onAddVariable, error, onInputValidation }) => {
    console.log("input render");

    const inputRef = useRef<HTMLInputElement>(null); //Состояние ререндеры вызывает, а инпут хранить как-то надо

    const handleAddVariable = () => {
      const inputValue = inputRef.current?.value;

      if (inputValue && onInputValidation(inputValue)) {
        const normalizedValue: WeatherVariable | undefined =
          inputValue as WeatherVariable;
        onAddVariable(normalizedValue);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    };

    return (
      <div>
        <label>
          <input type="text" ref={inputRef} />
        </label>
        <button onClick={handleAddVariable}>Добавить параметр</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }
);

VariableInput.displayName = "VariableInput";

export default VariableInput;
