import { Box } from "@mui/material";
import type { Tx_expenses } from "~/partials/models";
import DataCard from "./reporting/dataCard";

interface Props {
  visible: boolean;
  rows: Tx_expenses[];
}

export default function Dashboard({ visible, rows }: Props) {
  const calcTotalExpenses = (expensesIn: Tx_expenses[]) => {
    let result = 0;

    for (let i = 0; i < expensesIn.length; i++) {
      const amtAry = convertAmountToCents(expensesIn[i].Amount);
      let dollarAmount = parseInt(amtAry[0]);
      let centAmount = parseInt(amtAry[1]);

      if (dollarAmount < 0) {
        centAmount *= -1;
      }

      result = result + dollarAmount * 100 + centAmount;
    }

    return (result / 100).toString();
  };

  const convertAmountToCents = (amount: string) => {
    let trimmedAmt = amount
      .replace(")", "")
      .replace("(", "-")
      .replace("$", "")
      .replace(",", "");

    let formattedAmt = trimmedAmt.split(".");
    let dollars = formattedAmt[0];
    let cents = formattedAmt[1];

    return [dollars, cents];
  };

  if (visible) {
    return (
      <Box data-testid="dashboardOuterBox">
        <DataCard
          title={"Total Expenses"}
          value={`$${calcTotalExpenses(rows)}`}
          interval={"(Interval goes here)"}
          trend={"neutral"}
          data={[
            100, 200, 300, 400, 500, 400, 300, 400, 500, 600, 700, 800, 900,
            1000,
          ]}
        ></DataCard>
      </Box>
    );
  }
}
