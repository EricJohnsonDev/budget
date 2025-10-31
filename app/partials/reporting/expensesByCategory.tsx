import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { categoryData } from "../models";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import * as React from "react";
import { formatCentAmount } from "~/utilities/currencyFormat";

interface Props {
  expenses: categoryData[];
}

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
      {Array.from(expenses.values()).map((category) => (
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
              {Array.from(category.subcategory.values()).map((subcategory) => (
                <ListItemText key={subcategory.name} inset>
                  {subcategory.name} | {formatCentAmount(subcategory.amount)}
                </ListItemText>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
}
