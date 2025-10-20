import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import BudgetToolbar from "../toolbar";

test("Toolbar header is visible on mobile resolution", () => {
  render(<BudgetToolbar></BudgetToolbar>);
  const toolbar = screen.queryByText("EDJ Dev Budget");
  expect(toolbar).not.toBeNull();
});

test("Sidebar is visible on desktop resolution", () => {
  render(<BudgetToolbar></BudgetToolbar>);

  const desktopDrawer = screen.getByTestId("desktopDrawer");
  const mobileDrawer = screen.getByTestId("mobileDrawer");

  expect(window.getComputedStyle(desktopDrawer).visibility).toBe("visible");
  expect(window.getComputedStyle(mobileDrawer).visibility).toBe("hidden");
});

test("Sidebar is hidden by default on mobile resolution", () => {
  window.innerWidth = 430;
  window.dispatchEvent(new Event("resize"));
  render(<BudgetToolbar></BudgetToolbar>);

  const desktopDrawer = screen.getByTestId("desktopDrawer");
  const mobileDrawer = screen.getByTestId("mobileDrawer");

  expect(desktopDrawer.classList).toContain("hidden");
  expect(window.getComputedStyle(mobileDrawer).visibility).toBe("hidden");
});

test.skip("Sidebar can be expanded on mobile resolution", () => {
  render(<BudgetToolbar></BudgetToolbar>);
});

test.skip("Sidebar can be collapsed on mobile resolution", () => {
  render(<BudgetToolbar></BudgetToolbar>);
});
