/* eslint-disable react/prop-types */

import React, { useRef, useCallback } from "react";
import { WeatherVariable } from "../types";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import { ErrorMessage } from "../ui/ErrorMessage/ErrorMessage";

interface VariableInputProps {
  onAddVariable: (variable: WeatherVariable) => void;
  error: string | null;
  onInputValidation: (input: string) => boolean;
}

const VariableInput: React.FC<VariableInputProps> = React.memo(
  ({ onAddVariable, error, onInputValidation }) => {
    console.log("input render");

    const inputRef = useRef<HTMLInputElement>(null); //Состояние ререндеры вызывает, а инпут хранить как-то надо

    const handleAddVariable = useCallback(() => {
      const inputValue = inputRef.current?.value;

      if (inputValue && onInputValidation(inputValue)) {
        const normalizedValue: WeatherVariable | undefined =
          inputValue as WeatherVariable;
        onAddVariable(normalizedValue);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    }, [onAddVariable, onInputValidation]);

    return (
      <div className="input_field">
        <label>
          <Input ref={inputRef} />
        </label>
        <Button onClick={handleAddVariable}>Добавить параметр</Button>
        {error && <ErrorMessage message={error} />}
      </div>
    );
  }
);

VariableInput.displayName = "VariableInput";

export default VariableInput;
