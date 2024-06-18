import { UseDateSelectOptions } from "../use-date-select";
import { ReactHookFormCompatibleProps } from "../types";

export interface PresetComponentProps
  extends ReactHookFormCompatibleProps,
    UseDateSelectOptions {
  hideDay?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  yearWidth?: number;
  monthWidth?: number;
  dayWidth?: number;
}
