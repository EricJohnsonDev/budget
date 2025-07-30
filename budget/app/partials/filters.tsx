import { TextField } from "@mui/material";

interface Props {
  visible: boolean;
}

export function SearchFilter({ visible }: Props) {
  if (visible) {
    return <div>search filter</div>;
  }
}

export function DateFilter({ visible }: Props) {
  if (visible) {
    return (
      <section>
        <TextField
          name="startDate"
          label="Start Date"
          helperText="MM-dd-yyyy"
        ></TextField>
        <TextField
          name="endDate"
          label="End Date"
          helperText="MM-dd-yyyy"
        ></TextField>
      </section>
    );
  }
}

export function CategoryFilter({ visible }: Props) {
  if (visible) {
    return <div>category filter</div>;
  }
}

export function AmountFilter({ visible }: Props) {
  if (visible) {
    return <div>amount filter</div>;
  }
}
