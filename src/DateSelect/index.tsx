import React, { useCallback, useEffect } from "react";
import { useDateSelect } from "./use-date-select";

interface DateSelectProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  onBlur?: () => void;
}

const DateSelect = React.forwardRef<HTMLInputElement, DateSelectProps>(
  (props, ref) => {
    // Ref is forwarded, but it is intended to be used with react-hook-form's <Controller /> to focus the input when error occurs.
    // This component is still controlled even if ref is here.

    const { onChange, value } = props;

    const {
      yearValue,
      monthValue,
      dayValue,
      yearOptions,
      monthOptions,
      dayOptions,
      onYearChange,
      onMonthChange,
      onDayChange,
      dateValue,
      onDateChange,
    } = useDateSelect({ minYear: 1960, maxYear: 2000 }); // TODO: Be configurable

    useEffect(() => {
      if (dateValue !== value) {
        onChange(dateValue || "");
      }
    }, [dateValue, value]);

    return (
      <>
        <input
          type="date"
          value={value || ""}
          onChange={useCallback<React.ChangeEventHandler<HTMLInputElement>>(
            (e) => {
              onDateChange(e);
              onChange(e.target.value);
            },
            []
          )}
          ref={ref}
        />

        <select value={yearValue} onChange={onYearChange}>
          <option value="" disabled></option>
          {yearOptions.map((yearLabel) => (
            <option key={yearLabel} value={yearLabel}>
              {yearLabel}
            </option>
          ))}
        </select>
        <select value={monthValue} onChange={onMonthChange}>
          <option value="" disabled></option>
          {monthOptions.map((monthLabel) => (
            <option key={monthLabel} value={monthLabel}>
              {monthLabel}
            </option>
          ))}
        </select>
        <select value={dayValue} onChange={onDayChange}>
          <option value="" disabled></option>
          {dayOptions.map((dayLabel) => (
            <option key={dayLabel} value={dayLabel}>
              {dayLabel}
            </option>
          ))}
        </select>
      </>
    );
  }
);

export default DateSelect;
