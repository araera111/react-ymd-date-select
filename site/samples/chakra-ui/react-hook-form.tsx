import { useForm, Controller } from "react-hook-form";
import {
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import DateSelect from "../../../lib/DateSelect";
import DateDropdown from "../../../lib/presets/chakra-ui/DateDropdown";

type FormData = {
  date: string;
};

function App() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  console.log(watch("date")); // watch input value by passing the name of it

  const isError = !!errors.date;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={isError}>
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DateSelect {...field} render={DateDropdown} />
          )}
        />
        {!isError ? (
          <FormHelperText>Enter the date.</FormHelperText>
        ) : (
          <FormErrorMessage>This field is required.</FormErrorMessage>
        )}
      </FormControl>

      <input type="submit" />
    </form>
  );
}

function ChakraUIReactHookFormSample() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

export default ChakraUIReactHookFormSample;