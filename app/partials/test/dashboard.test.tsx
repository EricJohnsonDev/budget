import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Dashboard from "../dashboard";

test("Dashboard can be hidden", () => {
  render(<Dashboard visible={false} rows={[]}></Dashboard>);
  const dashboard = screen.queryByTestId("dashboardOuterBox");

  expect(dashboard).toBeNull();
});

test("Dashboard can be shown", () => {
  render(<Dashboard visible={true} rows={[]}></Dashboard>);
  const dashboard = screen.getByTestId("dashboardOuterBox");

  expect(dashboard.hidden).toBe(false);
});
