import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, afterEach } from "vitest";
import BudgetToolbar from "../toolbar";
import Home from "../../routes/home";

afterEach(() => {
  cleanup();
});

const setMobileResolution = () => {
  window.innerWidth = 430;
  window.dispatchEvent(new Event("resize"));
};

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
  render(<BudgetToolbar></BudgetToolbar>);
  setMobileResolution();

  const desktopDrawer = screen.getByTestId("desktopDrawer");
  const mobileDrawer = screen.getByTestId("mobileDrawer");

  expect(desktopDrawer.classList).toContain("hidden");
  expect(window.getComputedStyle(mobileDrawer).visibility).toBe("hidden");
});

test("Sidebar can be expanded and collapsed with menu icon on mobile resolution", async () => {
  const user = userEvent.setup();
  render(<BudgetToolbar></BudgetToolbar>);
  setMobileResolution();

  const mobileDrawer = screen.getByTestId("mobileDrawer");
  const navMenuButton = screen.getByLabelText("open drawer");

  await user.click(navMenuButton);
  expect(window.getComputedStyle(mobileDrawer).visibility).toBe("visible");

  await user.click(navMenuButton);
  waitFor(() =>
    expect(window.getComputedStyle(mobileDrawer).visibility).toBe("hidden"),
  );
});

test("Sidebar can be collapsed when background screen is clicked", async () => {
  const user = userEvent.setup();
  render(<BudgetToolbar></BudgetToolbar>);
  setMobileResolution();

  const mobileDrawer = screen.getByTestId("mobileDrawer");
  const navMenuButton = screen.getByLabelText("open drawer");

  await user.click(navMenuButton);
  expect(window.getComputedStyle(mobileDrawer).visibility).toBe("visible");

  // TODO investigate clicking off the toolbar/sidebar for this functionality
  // This "works", but doesn't actually cover a mobile use case
  await user.keyboard("{Esc}");
  waitFor(() =>
    expect(window.getComputedStyle(mobileDrawer).visibility).toBe("hidden"),
  );
});
