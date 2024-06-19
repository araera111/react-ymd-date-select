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
  addMonthLabel?: boolean;
  addDayLabel?: boolean;
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
        w={props.yearWidth + "px" ?? "full"}
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
        onChange={(e) => {
          // もともと31日まで選択されていて、たとえばうるう年ではない2月のときは日付が31日になってしまうので、日付を再設定する
          const year = Number(props.yearValue);
          const month = Number(e.target.value);
          const lastDay = new Date(year, month, 0).getDate();
          if (Number(props.dayValue) > lastDay) {
            props.onDayChange({ target: { value: lastDay } } as any);
          }
          props.onMonthChange(e);
        }}
        ref={props.hideDay ? ref : undefined}
        size={props.size ?? "md"}
        w={props.monthWidth + "px" ?? "full"}
      >
        <option value="" disabled></option>
        {props.monthOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
            {props.addMonthLabel ? "月" : ""}
          </option>
        ))}
      </Select>
      {!props.hideDay && (
        <Select
          value={props.dayValue}
          onChange={props.onDayChange}
          ref={ref}
          size={props.size ?? "md"}
          w={props.dayWidth + "px" ?? "full"}
        >
          <option value="" disabled></option>
          {props.dayOptions
            .filter((x) => {
              // y,m,dで選択された年月の日数を取得
              const year = Number(props.yearValue);
              const month = Number(props.monthValue);
              const lastDay = new Date(year, month, 0).getDate();
              return Number(x.value) <= lastDay;
            })
            .map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
                {props.addDayLabel ? "日" : ""}
              </option>
            ))}
        </Select>
      )}
    </HStack>
  );
});
DateDropdownGroup.displayName = "DateDropdownGroup";

export default DateDropdownGroup;
