import { render, screen } from "@testing-library/react";
import { Select } from ".";

test("[role=select]", () => {
  render(<Select options={[{ value: "hoge", label: "fuga" }]} />);
  expect(screen.getByRole("option")).toBeTruthy();
});
