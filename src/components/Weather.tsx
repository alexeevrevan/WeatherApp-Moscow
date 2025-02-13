import React from "react";
import useWeather from "../hooks/useWeather";
import { WeatherVariable } from "../types";
import { v4 as uuidv4 } from "uuid";
import { Table } from "../ui/Table/Table";
import { Loading } from "../ui/Loading/Loading";
import { ErrorMessage } from "../ui/ErrorMessage/ErrorMessage";

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

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  const headers = ['Date', ...props.variables];

  return (
    weather && (
      <Table headers={headers}>
        {weather.daily.time.map((time, index) => {
          const rowId = uuidv4();

          return (
            <tr key={rowId}>
              <td>{time}</td>
              {props.variables.map((variable) => {
                const cellId = uuidv4();

                return (
                  <td key={cellId}>
                    {weather.daily[variable]?.[index] !== undefined
                      ? weather.daily[variable][index]
                      : "Нет данных"}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </Table>
    )
  );
};

export default Weather;