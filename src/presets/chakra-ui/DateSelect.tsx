import React from "react";
import DateDropdownGroup from "./DateDropdownGroup";
import { useDateSelect } from "../../use-date-select";
import { PresetComponentProps } from "../types";

export type DateSelectProps = PresetComponentProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DateSelect = React.forwardRef<any, DateSelectProps>(
  ({ value, onChange, hideDay, size, ...dateSelectOpts }, ref) => {
    const useDateSelectInterface = useDateSelect(value, onChange, {
      ...dateSelectOpts,
      defaultDay: dateSelectOpts.defaultDay
        ? dateSelectOpts.defaultDay
        : hideDay
        ? 1
        : undefined,
    });
    return (
      <DateDropdownGroup
        {...useDateSelectInterface}
        hideDay={hideDay}
        ref={ref}
        size={size}
        yearWidth={dateSelectOpts.yearWidth}
        monthWidth={dateSelectOpts.monthWidth}
        dayWidth={dateSelectOpts.dayWidth}
        addMonthLabel={dateSelectOpts.addMonthLabel}
        addDayLabel={dateSelectOpts.addDayLabel}
      />
    );
  }
);
DateSelect.displayName = "DateSelect";

export default DateSelect;
