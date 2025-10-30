import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Stack } from "@mui/material";

interface Props {
  visible: boolean;
}

export function SearchFilter({ visible }: Props) {
  if (visible) {
    return (
      <div data-testid="searchFilter">search filter is not implemented</div>
    );
  }
}

export function DateFilter({ visible }: Props) {
  if (visible) {
    let defaultStartDate = new Date();
    defaultStartDate.setDate(1);

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2} direction={{ sm: "row" }}>
          <DatePicker
            className="!pb-2 md:pb-0"
            label="Start Date"
            name="startDate"
            format="MM-DD-YYYY"
            defaultValue={dayjs(defaultStartDate)}
          />
          <DatePicker
            label="End Date"
            name="endDate"
            format="MM-DD-YYYY"
            defaultValue={dayjs(new Date())}
          />
        </Stack>
      </LocalizationProvider>
    );
  }
}

export function CategoryFilter({ visible }: Props) {
  if (visible) {
    return (
      <div data-testid="categoryFilter">category filter is not implemented</div>
    );
  }
}

export function AmountFilter({ visible }: Props) {
  if (visible) {
    return (
      <div data-testid="amountFilter">amount filter is not implemented</div>
    );
  }
}
