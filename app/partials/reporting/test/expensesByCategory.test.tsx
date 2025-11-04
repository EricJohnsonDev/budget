import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import ExpensesByCategory from "../expensesByCategory";
import userEvent from "@testing-library/user-event";

const subcategoryDataOne = {
    name: "Other",
    amount: 50,
}

const subcategoryDataTwo = {
    name: "Other2",
    amount: 150,
}

const categoryData = [
    {
        name: "Rent",
        amount: 200,
        subcategory: new Map([
            ["Other", subcategoryDataOne],
            ["Other2", subcategoryDataTwo],
        ]),
    },
    {
        name: "Electric",
        amount: 50,
        subcategory: new Map([
            ["Other", subcategoryDataOne],
        ]),
    }
]

afterEach(() => {
  cleanup();
});

test("Expenses are listed by category", () => {
    render(<ExpensesByCategory expenses={categoryData}></ExpensesByCategory>);
    const categoryList = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(categoryList.children.length).toBe(2);
    expect(listItems.length).toBe(2);

    expect(listItems[0].textContent).toMatch(/.*Rent.*\$2\.00.*/);
    expect(listItems[1].textContent).toMatch(/.*Electric.*\$0\.50.*/);
});

test("Category can be expanded to reveal subcategories", async () => {
    const user = userEvent.setup();
    render(<ExpensesByCategory expenses={categoryData}></ExpensesByCategory>);
    let lists = screen.getAllByRole("list");
    let listItems = screen.getAllByRole("listitem");
    let expandMoreCarrot = screen.getAllByTestId("ExpandMoreIcon");
    let expandLessCarrot = screen.queryByTestId("ExpandLessIcon");

    expect(lists.length).toBe(1);
    expect(listItems.length).toBe(2);
    expect(expandMoreCarrot.length).toBe(2);
    expect(expandLessCarrot).toBeNull();

    await user.click(listItems[0].children[0]);

    lists = screen.getAllByRole("list");
    expandMoreCarrot = screen.getAllByTestId("ExpandMoreIcon");
    expandLessCarrot = screen.queryByTestId("ExpandLessIcon");

    expect(lists.length).toBe(2);
    expect(expandMoreCarrot.length).toBe(1);
    expect(expandLessCarrot).not.toBeNull();

    let subcategoryListItems = lists[1];
    expect(subcategoryListItems.children.length).toBe(2);
    expect(subcategoryListItems.children[0].textContent).toMatch(/.*Other.*\$0\.50/);
    expect(subcategoryListItems.children[1].textContent).toMatch(/.*Other2.*\$1\.50/);
})

test("Expanded category can be collapsed", async () => {
    const user = userEvent.setup();
    render(<ExpensesByCategory expenses={categoryData}></ExpensesByCategory>);
    let lists = screen.getAllByRole("list");
    let listItems = screen.getAllByRole("listitem");

    expect(lists.length).toBe(1);
    expect(listItems.length).toBe(2);

    // Expand
    await user.click(listItems[0].children[0]);

    lists = screen.getAllByRole("list");
    expect(lists.length).toBe(2);

    // Collapse
    await user.click(listItems[0].children[0]);

    lists = screen.getAllByRole("list");
    expect(lists.length).toBe(1);
});