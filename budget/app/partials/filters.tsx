import Grid from "@mui/material/Grid";

interface Props {
  visible: boolean;
}

export function SearchFilter({ visible }: Props) {
  if (visible) {
    return <div>text filter</div>;
  }
}

export function DateFilter({ visible }: Props) {
  if (visible) {
    return <div>date filter</div>;
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
