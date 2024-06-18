import React from "react";
import { Select, HStack } from "@chakra-ui/react";
import { Options } from "../../types";

export interface DateDropdownGroupProps {
  yearValue: string;
  monthValue: string;
  dayValue: string;
  yearOptions: Options;
  monthOptions: Options;
  dayOptions: Options;
  onYearChange: React.ChangeEventHandler<HTMLSelectElement>;
  onMonthChange: React.ChangeEventHandler<HTMLSelectElement>;
  onDayChange: React.ChangeEventHandler<HTMLSelectElement>;
  hideDay?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  yearWidth?: number;
  monthWidth?: number;
  dayWidth?: number;
}

const DateDropdownGroup = React.forwardRef<
  HTMLSelectElement,
  DateDropdownGroupProps
>((props, ref) => {
  return (
    <HStack>
      <Select
        value={props.yearValue}
        onChange={props.onYearChange}
        size={props.size ?? "md"}
        w={props.yearWidth ?? "full"}
      >
        <option value="" disabled></option>
        {props.yearOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Select
        value={props.monthValue}
        onChange={props.onMonthChange}
        ref={props.hideDay ? ref : undefined}
        size={props.size ?? "md"}
        w={props.monthWidth ?? "full"}
      >
        <option value="" disabled></option>
        {props.monthOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      {!props.hideDay && (
        <Select
          value={props.dayValue}
          onChange={props.onDayChange}
          ref={ref}
          size={props.size ?? "md"}
          w={props.dayWidth ?? "full"}
        >
          <option value="" disabled></option>
          {props.dayOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      )}
    </HStack>
  );
});
DateDropdownGroup.displayName = "DateDropdownGroup";

export default DateDropdownGroup;
