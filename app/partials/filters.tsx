import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
        <DatePicker
          data-testid="dateFilterStart"
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
          data-testid="dateFilterEnd"
        />
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
