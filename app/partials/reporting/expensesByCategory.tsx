import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { Tx_expenses } from "../models";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import * as React from "react";

interface Props {
  expenses: Tx_expenses[];
}

const convertAmountToCents = (amount: string) => {
  let trimmedAmt = amount
    .replace(")", "")
    .replace("(", "-")
    .replace("$", "")
    .replace(",", "");

  let formattedAmt = trimmedAmt.split(".");
  let dollars = formattedAmt[0];
  let cents = formattedAmt[1];

  return parseInt(dollars) * 100 + parseInt(cents);
};

const formatCentAmount = (centsIn: number): string => {
  let dollars = Math.floor(centsIn / 100);
  let cents = centsIn % 100;
  let result = `$${dollars}.${cents}`;

  return result;
};

const sumExpensesByCategory = (expenses: Tx_expenses[]) => {
  interface subcategoryData {
    name: string;
    amount: number;
  }

  interface categoryData {
    name: string;
    amount: number;
    subcategory: Map<string, subcategoryData>;
  }

  let result = new Map<String, categoryData>();

  for (var expense of expenses) {
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

  return result;
};

export default function ExpensesByCategory({ expenses }: Props) {
  const [isOpen, setIsOpen] = React.useState(new Map<string, boolean>());

  const handleClick = (category: string) => {
    const updatedCategoryState = new Map(isOpen);
    if (isOpen.has(category)) {
      updatedCategoryState.set(category, !updatedCategoryState.get(category));
    } else {
      updatedCategoryState.set(category, true);
    }

    setIsOpen(updatedCategoryState);
  };

  return (
    <List disablePadding>
      {Array.from(sumExpensesByCategory(expenses).values()).map((category) => (
        <Box key={category.name}>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleClick(category.name)}>
              {isOpen.get(category.name) ? <ExpandLess /> : <ExpandMore />}
              <ListItemText>
                {category.name} | {formatCentAmount(category.amount)}
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Collapse in={isOpen.get(category.name)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {Array.from(category.subcategory.values()).map((s) => (
                <ListItemText key={s.name}>
                  {s.name} | {formatCentAmount(s.amount)}
                </ListItemText>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
}
