import { Box, Stack } from "@mui/material";
import type {
  categoryData,
  subcategoryData,
  Tx_expenses,
} from "~/partials/models";
import DataCard from "./reporting/dataCard";
import ChartAmountByCategory from "./reporting/chartAmountByCategory";
import ExpensesByCategory from "./reporting/expensesByCategory";
import {
  convertAmountToCents,
  formatCentAmount,
} from "~/utilities/currencyFormat";

interface Props {
  visible: boolean;
  rows: Tx_expenses[];
}

const calcTotalExpenses = (expensesIn: Tx_expenses[]) => {
  let result = 0;

  for (let i = 0; i < expensesIn.length; i++) {
    result += convertAmountToCents(expensesIn[i].Amount);
  }

  return formatCentAmount(result);
};

const calcExpensesByCategory = (expensesIn: Tx_expenses[]) => {
  let result = new Map<String, categoryData>();

  for (var expense of expensesIn) {
    let expenseCentAmount = convertAmountToCents(expense.Amount);

    // Default subcategory
    let updatedSubcategory = new Map<string, subcategoryData>();
    let updatedSubcategoryData = {
      name: expense.Subcategory,
      amount: expenseCentAmount,
    };
    updatedSubcategory.set(expense.Subcategory, updatedSubcategoryData);

    // Default category
    let updatedCategoryData = {
      name: expense.Category,
      amount: expenseCentAmount,
      subcategory: updatedSubcategory,
    };

    // Update existing category
    if (result.has(expense.Category)) {
      // @ts-expect-error
      updatedCategoryData = result.get(expense.Category);
      updatedCategoryData.amount += expenseCentAmount;

      // Update existing subcategory
      if (updatedCategoryData.subcategory.has(expense.Subcategory)) {
        // @ts-expect-error
        updatedSubcategoryData = updatedCategoryData.subcategory.get(
          expense.Subcategory,
        );
        updatedSubcategoryData.amount += expenseCentAmount;
      }

      updatedCategoryData.subcategory.set(
        expense.Subcategory,
        updatedSubcategoryData,
      );
    } else {
      // Add new category
      result.set(expense.Category, updatedCategoryData);
    }
  }

  return Array.from(result.values());
};

export default function Dashboard({ visible, rows }: Props) {
  if (visible) {
    return (
      <Box data-testid="dashboardOuterBox">
        <Stack spacing={2}>
          <DataCard
            title={"Total Expenses"}
            value={`${calcTotalExpenses(rows)}`}
          ></DataCard>
          <Stack spacing={2} direction={{ sm: "row" }}>
            <DataCard title="Expenses by category">
              <ExpensesByCategory
                expenses={calcExpensesByCategory(rows).sort((a, b) =>
                  a.name.localeCompare(b.name),
                )}
              ></ExpensesByCategory>
            </DataCard>
            <DataCard title="Expenses by category">
              <ChartAmountByCategory
                expenses={calcExpensesByCategory(rows).sort(
                  (a, b) => b.amount - a.amount,
                )}
              ></ChartAmountByCategory>
            </DataCard>
          </Stack>
        </Stack>
      </Box>
    );
  }
}
