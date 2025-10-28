import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, afterEach } from "vitest";
import View from "../view";

afterEach(() => {
  cleanup();
});

test("Date filter is the only one selected by default", () => {
  render(<View></View>);

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
  render(<View></View>);

  const categoryFilterButton = screen.getByLabelText("category filter");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(categoryFilterButton);
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(categoryFilterButton);
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("Amount filter can be selected and unselected", async () => {
  const user = userEvent.setup();
  render(<View></View>);

  const amountFilterButton = screen.getByLabelText("amount filter");
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(amountFilterButton);
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(amountFilterButton);
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("Search filter can be selected and unselected", async () => {
  const user = userEvent.setup();
  render(<View></View>);

  const searchFilterButton = screen.getByLabelText("search filter");
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(searchFilterButton);
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(searchFilterButton);
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("At least one filter must be selected", async () => {
  const user = userEvent.setup();
  render(<View></View>);

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

test("Button to clear table results only appears when table has data", async () => {
  const user = userEvent.setup();
  render(<View></View>);
  const searchButton = screen.getByText("search");
  const clearResultsButton = screen.getByText("Clear results");
  const viewTable = screen.queryByTestId("viewTableOuterBox");

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

test("View table appears when results return from search", async () => {
  const user = userEvent.setup();
  render(<View></View>);
  const searchButton = screen.getByText("search");
  const viewTable = screen.queryByTestId("viewTableOuterBox");

  expect(viewTable).toBeNull();

  await user.click(searchButton);

  waitFor(() => {
    expect(viewTable).not.toBeNull();
    expect(viewTable?.getAttribute("hidden")).toBe("false");
  });
});
