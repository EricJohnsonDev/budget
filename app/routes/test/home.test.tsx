import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, afterEach } from "vitest";
import Home from "../home";

afterEach(() => {
  cleanup();
});

test("Date filter is the only search filter selected by default", () => {
  render(<Home></Home>);

  const dateFilterButton = screen.getByLabelText("date filter");
  const categoryFilterButton = screen.getByLabelText("category filter");
  const amountFilterButton = screen.getByLabelText("amount filter");
  const searchFilterButton = screen.getByLabelText("search filter");

  expect(dateFilterButton.getAttribute("aria-pressed")).toEqual("true");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("false");
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("Category filter can be selected and unselected", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const categoryFilterButton = screen.getByLabelText("category filter");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(categoryFilterButton);
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(categoryFilterButton);
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("Amount filter can be selected and unselected", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const amountFilterButton = screen.getByLabelText("amount filter");
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(amountFilterButton);
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(amountFilterButton);
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("Search filter can be selected and unselected", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const searchFilterButton = screen.getByLabelText("search filter");
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(searchFilterButton);
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(searchFilterButton);
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("At least one search filter must be selected", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const dateFilterButton = screen.getByLabelText("date filter");
  const categoryFilterButton = screen.getByLabelText("category filter");

  expect(dateFilterButton.getAttribute("aria-pressed")).toEqual("true");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(dateFilterButton);
  expect(dateFilterButton.getAttribute("aria-pressed")).toEqual("true");

  // Switch to a non-default button to help guard against a false positive
  await user.click(categoryFilterButton);
  await user.click(dateFilterButton);

  expect(dateFilterButton.getAttribute("aria-pressed")).toEqual("false");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(categoryFilterButton);
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("true");
});

test("Button to clear results only appears when data is populated", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);
  const searchButton = screen.getByText("search");
  const clearResultsButton = screen.getByText("Clear results");
  const viewTable = screen.queryByTestId("txTableOuterBox");

  expect(clearResultsButton.hidden).toBe(true);

  await user.click(searchButton);

  expect(clearResultsButton.hidden).toBe(false);

  waitFor(() => {
    expect(viewTable).not.toBeNull();
  });

  await user.click(clearResultsButton);

  expect(clearResultsButton.hidden).toBe(true);
  expect(viewTable).toBeNull();
});

test("When results return from search and table view filter is selected, only the transaction table appears", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);
  const searchButton = screen.getByText("search");
  const tableViewFilterButton = screen.getByLabelText("table view filter");
  const txTable = screen.queryByTestId("txTableOuterBox");
  const dashboard = screen.queryByTestId("dashboardOuterBox");

  expect(txTable).toBeNull();
  expect(dashboard).toBeNull();

  await user.click(tableViewFilterButton);
  await user.click(searchButton);

  waitFor(() => {
    expect(txTable).not.toBeNull();
    expect(dashboard).toBeNull();
    expect(txTable?.getAttribute("hidden")).toBe("false");
  });
});

test("When results return from search and dashboard view filter is selected, only the dashboard appears", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);
  const searchButton = screen.getByText("search");
  const txTable = screen.queryByTestId("txTableOuterBox");
  const dashboard = screen.queryByTestId("dashboardOuterBox");

  expect(txTable).toBeNull();
  expect(dashboard).toBeNull();

  // Dashboard view filter is selected by default
  await user.click(searchButton);

  waitFor(() => {
    expect(dashboard).not.toBeNull();
    expect(txTable).toBeNull();
    expect(dashboard?.getAttribute("hidden")).toBe("false");
  });
});

test("When data is populated, view can seamlessly switch between dashboard and table", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);
  const searchButton = screen.getByText("search");
  const txTable = screen.queryByTestId("txTableOuterBox");
  const dashboard = screen.queryByTestId("dashboardOuterBox");
  const tableViewFilterButton = screen.getByLabelText("table view filter");
  const dashboardViewFilterButton = screen.getByLabelText(
    "dashboard view filter",
  );

  await user.click(searchButton);

  // Dashboard view filter is selected by default
  waitFor(() => {
    expect(dashboard).not.toBeNull();
    expect(txTable).toBeNull();
    expect(dashboard?.getAttribute("hidden")).toBe("false");
  });

  await user.click(tableViewFilterButton);
  waitFor(() => {
    expect(txTable).not.toBeNull();
    expect(dashboard).toBeNull();
    expect(txTable?.getAttribute("hidden")).toBe("false");
  });

  await user.click(dashboardViewFilterButton);
  waitFor(() => {
    expect(dashboard).not.toBeNull();
    expect(txTable).toBeNull();
    expect(dashboard?.getAttribute("hidden")).toBe("false");
  });
});
